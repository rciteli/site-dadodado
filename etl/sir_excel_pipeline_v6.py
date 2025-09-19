# sir_excel_pipeline_v6.py  — v6.1 "clean IO + metrics export"
# - Lê CSV ou XLSX
# - Deriva nome de saída: <basename>__Resultado.csv (por padrão em processed/)
# - Exporta também <basename>__MetricsExport.csv (subset padronizado para aba Metrics)
# - Mantém toda a lógica de normalização e pesos existente
# - Aceita sinônimos de colunas e valida presença com logs

import argparse
import os
import re
from typing import Dict, List, Tuple
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# ============================
# Helpers de IO e nomes
# ============================

def _coerce_sheet_arg(s):
    """
    '0' -> 0 (int), '1' -> 1 (int). Strings não-numéricas (ex.: 'Planilha1') permanecem.
    None -> 0.
    """
    if s is None:
        return 0
    if isinstance(s, int):
        return s
    s_str = str(s).strip()
    if s_str.isdigit():
        try:
            return int(s_str)
        except Exception:
            return 0
    return s_str

def _is_percent_col(col: str) -> bool:
    c = col.lower()
    # trate como percentual (0–1) se for engajamento/var_engagement ou convenções comuns
    return (
        c.startswith("engagement_")
        or c.startswith("var_engagement_")
        or c.endswith("_pct")
        or "rate" in c
    )

_NUMERIC_COL_REGEX = re.compile(
    r"^(presence|fans|posts|likes|comments|shares|engagement|views|mentions|var_fans|var_(likes|comments|shares)|var_engagement)_",
    re.I,
)

def _clean_numeric_series_one_decimal(obj: pd.Series, is_percent: bool = False) -> pd.Series:
    """
    Converte strings com vírgula decimal para ponto, remove milhares, tira '%'.
    Se is_percent=True, divide por 100 quando houver '%' explícito ou quando os
    valores numéricos aparentarem estar em 0–100.
    Arredonda para 1 casa decimal ao final.
    """
    s = obj.copy()
    had_pct_mask = None

    if s.dtype == object:
        s = s.astype(str).str.strip()

        # detecta '%' antes de remover
        had_pct_mask = s.str.contains("%", regex=False, na=False)

        # remove símbolo de porcentagem
        s = s.str.replace("%", "", regex=False)

        # "1.234,5" -> "1234,5"
        pat_thousand_then_comma = r"^\d{1,3}(\.\d{3})+(,\d+)?$"
        mask = s.str.match(pat_thousand_then_comma)
        s.loc[mask] = s.loc[mask].str.replace(".", "", regex=False)

        # vírgula decimal -> ponto
        s = s.str.replace(",", ".", regex=False)

        # remove NBSP etc.
        s = s.str.replace("\u00A0", "", regex=False)

        # vazio -> NaN
        s = s.replace({"": None, "-": None})

        s = pd.to_numeric(s, errors="coerce")

    # se virou numérico (ou já era)
    if pd.api.types.is_numeric_dtype(s):
        s = s.astype(float)

        # normalização de percentuais para fração (0–1)
        if is_percent:
            # se havia '%' explícito em pelo menos um valor → dividir por 100
            if had_pct_mask is not None and had_pct_mask.any():
                s = s / 100.0
            else:
                # heurística: se (0 <= s <= 100) e parecer escala 0–100, tratar como %
                s_nonnull = s.dropna()
                if not s_nonnull.empty:
                    smin, smax = s_nonnull.min(), s_nonnull.max()
                    if 0.0 <= smin and smax <= 100.0 and smax > 1.0:
                        s = s / 100.0

        # arredonda para 1 casa (requisito do projeto)
        s = s.round(1)

    return s


def clean_numeric_dataframe_one_decimal(df: pd.DataFrame) -> pd.DataFrame:
    """
    Aplica sanitização numérica nas colunas reconhecidas (regex) ou já numéricas.
    'name' fica intacto. Colunas percentuais são trazidas para 0–1.
    """
    out = df.copy()
    for col in out.columns:
        if col == "name":
            continue
        needs_numeric = _NUMERIC_COL_REGEX.match(col) or pd.api.types.is_numeric_dtype(out[col])
        if needs_numeric:
            out[col] = _clean_numeric_series_one_decimal(out[col], is_percent=_is_percent_col(col))
    return out

def _slugify(s: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9\-_.]+", "-", s.strip())
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s

def _derive_basenames(input_path: str, out_dir: str|None) -> Tuple[str, str]:
    """
    Retorna (resultado_csv_path, metrics_csv_path)
    - Se out_dir for None: usa data/processed (irmão de data/raw se existir; senão, pasta do input)
    - Nome base: <basename-do-input-sem-ext>__Resultado.csv e __MetricsExport.csv
    """
    src_dir, src_name = os.path.dirname(os.path.abspath(input_path)), os.path.basename(input_path)
    base_noext = os.path.splitext(src_name)[0]
    base_noext = _slugify(base_noext)

    # destino
    if out_dir:
        dest_dir = out_dir
    else:
        # tenta "data/processed" relativo à raiz do repo
        repo_root = os.getcwd()
        processed = os.path.join(repo_root, "data", "processed")
        dest_dir = processed if os.path.isdir(processed) else src_dir

    os.makedirs(dest_dir, exist_ok=True)
    result_csv = os.path.join(dest_dir, f"{base_noext}__Resultado.csv")
    metrics_csv = os.path.join(dest_dir, f"{base_noext}__MetricsExport.csv")
    return result_csv, metrics_csv

def _read_table_any(path: str, sheet_name: str|int=0) -> pd.DataFrame:
    if not os.path.exists(path):
        raise FileNotFoundError(f"Arquivo não encontrado: {path}")
    ext = os.path.splitext(path)[1].lower()
    if ext in [".xlsx", ".xlsm", ".xls"]:
        return pd.read_excel(path, sheet_name=sheet_name)
    # CSV (tenta encoding/sep comuns)
    try:
        return pd.read_csv(path)
    except Exception:
        try:
            return pd.read_csv(path, sep=";", encoding="latin1")
        except Exception:
            return pd.read_csv(path, sep=";", encoding="utf-8")

# ============================
# Sinônimos e validação de colunas
# ============================

_CANON_PLATFORMS = ["facebook", "instagram", "twitter", "tiktok"]

_SYNONYMS = {
    # id
    "name":        [r"^page$", r"^account$", r"^perfil$", r"^nome$"],

    # base fans
    r"^fans_(PLAT)$": [
        r"^followers_(PLAT)$", r"^seguidores_(PLAT)$"
    ],
    # posts
    r"^posts_(PLAT)$": [
        r"^posts_count_(PLAT)$", r"^qtd_posts_(PLAT)$"
    ],
    # likes/comments/shares
    r"^likes_(PLAT)$": [r"^curtidas_(PLAT)$"],
    r"^comments_(PLAT)$": [r"^comentarios_(PLAT)$"],
    r"^shares_(PLAT)$": [
        r"^compartilhamentos_(PLAT)$", r"^retweets_twitter$", r"^video_shares_tiktok$"
    ],
    # eng composto
    r"^engagement_(PLAT)$": [
        r"^eng_(PLAT)$", r"^engagement_rate_(PLAT)$"
    ],
    # variations
    r"^var_fans_(PLAT)$": [r"^delta_followers_(PLAT)$"],
    r"^var_(likes|comments|shares)_(PLAT)$": [r"^delta_(likes|comments|shares)_(PLAT)$"],
    r"^var_engagement_(PLAT)$": [r"^delta_eng_(PLAT)$", r"^delta_engagement_(PLAT)$"],
    # presence
    r"^presence_(PLAT)$": [r"^has_(PLAT)$", r"^(PLAT)_present$"],
}

def _expand_synonyms() -> List[Tuple[re.Pattern, str]]:
    """
    Retorna lista [(pattern_sinonimo, canonical_dest)]
    """
    rules = []
    for canon, synos in _SYNONYMS.items():
        for plat in _CANON_PLATFORMS:
            canon_pat = canon.replace("(PLAT)", plat)
            canon_dest = canon_pat  # destino final
            for syn in synos:
                syn_pat = syn.replace("(PLAT)", plat)
                rules.append((re.compile(syn_pat, re.I), canon_dest))
    # id simples
    rules.append((re.compile(r"^nome$", re.I), "name"))
    rules.append((re.compile(r"^page$", re.I), "name"))
    rules.append((re.compile(r"^account$", re.I), "name"))
    return rules

def canonicalize_columns(df: pd.DataFrame) -> Tuple[pd.DataFrame, Dict[str, str], List[str]]:
    """
    Renomeia colunas conhecidas para a forma canônica.
    Retorna: (df_renamed, mapping_aplicado, faltantes_relativos)
    """
    colmap = {}
    rules = _expand_synonyms()
    # 1) aplica sinônimos
    for col in list(df.columns):
        for pat, dest in rules:
            if pat.match(col):
                colmap[col] = dest
                break
    out = df.rename(columns=colmap)

    # 2) garante 'name'
    if "name" not in out.columns:
        for alt in ["page", "account", "perfil", "nome"]:
            if alt in out.columns:
                out = out.rename(columns={alt: "name"})
                break
        if "name" not in out.columns:
            out = out.reset_index().rename(columns={"index": "name"})

    # 3) checa faltas relevantes (opcional; não bloqueia)
    needed_prefixes = [
        r"^presence_", r"^fans_", r"^posts_", r"^(likes|comments|shares)_",
        r"^engagement_", r"^var_fans_", r"^var_(likes|comments|shares)_", r"^var_engagement_"
    ]
    faltas = []
    for pref in needed_prefixes:
        if not any(re.match(pref, c) for c in out.columns):
            faltas.append(pref)

    return out, colmap, faltas

# ============================
# Normalização e cálculo (seu código original, intacto)
# ============================

def _second_largest(arr: np.ndarray) -> float:
    positives = arr[arr > 0]
    if len(positives) <= 1:
        return positives.max() if len(positives) == 1 else 0.0
    top2 = np.sort(positives)[-2:]
    return top2[0]

def normalize_0_100_pos_floor_cap(
    x: pd.Series,
    piso_positivo: float = 1.0,
    cap_min: float = 98.0,
    dominance_factor: float = 10.0,
) -> pd.Series:
    vals = pd.to_numeric(x, errors="coerce").fillna(0.0).values.astype(float)
    out = np.zeros_like(vals, dtype=float)
    mask_pos = vals > 0
    if not mask_pos.any():
        return pd.Series(out, index=x.index)

    pos_vals = vals[mask_pos]
    min_pos, max_pos = pos_vals.min(), pos_vals.max()
    second_pos = _second_largest(vals)

    if max_pos <= 0:
        cap = cap_min
    else:
        denom = second_pos if second_pos > 0 else max_pos
        ratio = max_pos / denom if denom > 0 else 1.0
        if ratio >= dominance_factor:
            cap = 100.0
        else:
            t = max(0.0, min(1.0, (ratio - 1.0) / max(dominance_factor - 1.0, 1e-9)))
            cap = cap_min + t * (100.0 - cap_min)

    if np.isclose(max_pos, min_pos):
        out[mask_pos] = 0.5 * (piso_positivo + cap)
        return pd.Series(out, index=x.index)

    escala = (pos_vals - min_pos) / (max_pos - min_pos)
    out[mask_pos] = piso_positivo + escala * (cap - piso_positivo)
    return pd.Series(out, index=x.index)

def apply_platform_weights(df: pd.DataFrame, platform_weights: Dict[str, float]) -> pd.DataFrame:
    """
    [DESABILITADO] Pesos por plataforma removidos por decisão de produto.
    Mantemos a função para compatibilidade, mas ignoramos quaisquer pesos.
    """
    # Se vierem pesos != 1.0, apenas logamos para deixar explícito que são ignorados.
    try:
        nondefault = {k: float(v) for k, v in (platform_weights or {}).items() if float(v) != 1.0}
        if nondefault:
            print(f"[INFO] Ignorando pesos de plataforma (deprecated): {nondefault}")
    except Exception:
        pass
    return df


def _n01_preserva_zero(s: pd.Series) -> pd.Series:
    s = pd.to_numeric(s, errors="coerce").fillna(0.0).astype(float)
    smin, smax = s.min(), s.max()
    if np.isclose(smax, smin):
        res = pd.Series(np.zeros(len(s), dtype=float), index=s.index)
        res[s > 0] = 0.5
        return res
    return (s - smin) / (smax - smin)

def compute_dimensions_raw(df: pd.DataFrame) -> pd.DataFrame:
    d = df.copy()
    if "name" not in d.columns:
        d = d.reset_index().rename(columns={"index": "name"})

    d["pop_raw"] = d.filter(regex=r"^fans_").apply(pd.to_numeric, errors="coerce").fillna(0.0).sum(axis=1)
    var_fans       = d.filter(regex=r"^var_fans_").apply(pd.to_numeric, errors="coerce").fillna(0.0).sum(axis=1)
    var_reactions  = d.filter(regex=r"^var_(likes|comments|shares)_").apply(pd.to_numeric, errors="coerce").fillna(0.0).sum(axis=1)
    var_engagement = d.filter(regex=r"^var_engagement_").apply(pd.to_numeric, errors="coerce").fillna(0.0).sum(axis=1)

    vf = _n01_preserva_zero(var_fans)
    vr = _n01_preserva_zero(var_reactions)
    ve = _n01_preserva_zero(var_engagement)
    d["score_crescimento"] = (3*vf + vr + 2*ve) / 8.0
    max_pop = max(d["pop_raw"].max(), 1.0)
    d["pop_final_raw"] = 0.9 * d["pop_raw"] + 0.1 * d["score_crescimento"] * max_pop

    d["ativ_raw"] = d.filter(regex=r"^posts_").apply(pd.to_numeric, errors="coerce").fillna(0.0).sum(axis=1)

    eng_cols = [c for c in ["engagement_facebook","engagement_instagram","engagement_twitter","engagement_tiktok"] if c in d.columns]
    if eng_cols:
        tmp = d[eng_cols].apply(pd.to_numeric, errors="coerce").fillna(0.0)
        n_redes = tmp.notna().sum(axis=1).clip(lower=1)
        d["eng_media"] = tmp.sum(axis=1) / n_redes
    else:
        d["eng_media"] = 0.0
    reacts = d.filter(regex=r"^(likes|comments|shares)_(facebook|instagram|twitter|tiktok)$") \
              .apply(pd.to_numeric, errors="coerce").fillna(0.0).sum(axis=1)
    reacts_n01 = _n01_preserva_zero(reacts)
    d["eng_raw"] = d["eng_media"] + 0.1 * reacts_n01

    d["dif_raw"] = d.filter(regex=r"^shares_(facebook|twitter|tiktok)$").apply(pd.to_numeric, errors="coerce").fillna(0.0).sum(axis=1)

    d.attrs["presence_cols"] = [c for c in d.columns if c.startswith("presence_")]
    return d

def compute_presence_score_0_100(df_with_presence: pd.DataFrame) -> pd.Series:
    presence_cols = df_with_presence.attrs.get("presence_cols", [c for c in df_with_presence.columns if c.startswith("presence_")])
    if not presence_cols:
        return pd.Series(np.zeros(len(df_with_presence), dtype=float), index=df_with_presence.index)
    pres_df = df_with_presence[presence_cols].apply(pd.to_numeric, errors="coerce").fillna(0.0)
    num_networks = pres_df.shape[1]
    count_present = (pres_df > 0).sum(axis=1)
    return (count_present / num_networks) * 100.0

def to_scores_0_100_other_dims(dims_df: pd.DataFrame, piso_positivo: float, cap_min: float, dominance_factor: float) -> pd.DataFrame:
    d = dims_df.copy()
    d["popularidade_100"] = normalize_0_100_pos_floor_cap(d["pop_final_raw"], piso_positivo, cap_min, dominance_factor)
    d["atividade_100"]    = normalize_0_100_pos_floor_cap(d["ativ_raw"], piso_positivo, cap_min, dominance_factor)
    d["engajamento_100"]  = normalize_0_100_pos_floor_cap(d["eng_raw"], piso_positivo, cap_min, dominance_factor)
    d["difusao_100"]      = normalize_0_100_pos_floor_cap(d["dif_raw"], piso_positivo, cap_min, dominance_factor)
    return d

def weighted_final_score_0_100(dims_df: pd.DataFrame, w: Dict[str, float]) -> pd.DataFrame:
    d = dims_df.copy()
    weights = {k: float(v) for k, v in w.items()}
    wsum = sum(weights.values()) or 1.0
    for k in weights: weights[k] /= wsum
    d["presenca_100"] = d.get("presenca_100", 0.0)
    d["sir_final_0_100"] = (
        weights["presenca"]     * d["presenca_100"] +
        weights["popularidade"] * d["popularidade_100"] +
        weights["atividade"]    * d["atividade_100"] +
        weights["engajamento"]  * d["engajamento_100"] +
        weights["difusao"]      * d["difusao_100"]
    )
    cols = ["name","presenca_100","popularidade_100","atividade_100","engajamento_100","difusao_100","sir_final_0_100"]
    for c in cols:
        if c not in d.columns: d[c] = np.nan
    return d[cols].copy()

# ============================
# Plots (inalterado)
# ============================

def _safe_filename(text: str) -> str:
    bad = '<>:"/\\|?* '
    out = "".join(("_" if ch in bad else ch) for ch in str(text))
    return out.strip("_")

def plot_bar_sorted(df: pd.DataFrame, value_col: str, name_col: str, out_png: str,
                    width_in: float = 12.0, height_in: float = 6.0, color_hex: str = "#2e95d3"):
    work = df[[name_col, value_col]].dropna().copy()
    work[value_col] = pd.to_numeric(work[value_col], errors="coerce")
    work = work.sort_values(by=value_col, ascending=False)

    plt.figure(figsize=(width_in, height_in))
    ax = plt.gca()
    ax.bar(work[name_col], work[value_col], color=color_hex)
    for i, (x, y) in enumerate(zip(work[name_col], work[value_col])):
        ax.text(i, y, f"{y:.2f}", ha="center", va="bottom", fontsize=9, fontweight="bold")
    ax.set_title(value_col); ax.set_xlabel(""); ax.set_ylabel("")
    plt.xticks(rotation=45, ha="right", fontsize=10, fontweight="bold")
    plt.tight_layout()
    os.makedirs(os.path.dirname(out_png), exist_ok=True)
    plt.savefig(out_png, dpi=150)
    plt.close()

def make_all_bar_charts(results_xlsx: str, sheet: int|str, output_dir: str,
                        bar_width: float, bar_height: float, plot_prefix: str,
                        name_col: str = "name", columns: List[str] | None = None):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir, exist_ok=True)
    data = pd.read_excel(results_xlsx, sheet_name=sheet)
    if columns is None:
        columns = [c for c in data.columns if c != name_col]
    if "INFLUENCIA_DIGITAL" in data.columns and "INFLUENCIA_DIGITAL" not in columns:
        columns.append("INFLUENCIA_DIGITAL")
    for col in columns:
        if col not in data.columns:
            continue
        fname = f"{plot_prefix}{_safe_filename(col)}.png"
        out_png = os.path.join(output_dir, fname)
        try:
            plot_bar_sorted(data, col, name_col, out_png, bar_width, bar_height)
        except Exception as e:
            print(f"[WARN] Falha ao plotar {col}: {e}")

# ============================
# Export para aba Metrics (formato long)
# ============================

def export_metrics_long(df_raw: pd.DataFrame, out_csv: str):
    # detecta possíveis períodos
    pstart = None
    pend = None
    for c in df_raw.columns:
        if c.lower() in ["period_start", "date_from", "inicio_periodo", "start_date"]:
            pstart = c
        if c.lower() in ["period_end", "date_to", "fim_periodo", "end_date"]:
            pend = c

    records = []
    for plat in _CANON_PLATFORMS:
        pairs = [
            ("fans",           f"fans_{plat}"),
            ("posts",          f"posts_{plat}"),
            ("likes",          f"likes_{plat}"),
            ("comments",       f"comments_{plat}"),
            ("shares",         f"shares_{plat}"),
            ("engagement",     f"engagement_{plat}"),
            ("var_fans",       f"var_fans_{plat}"),
            ("var_likes",      f"var_likes_{plat}"),
            ("var_comments",   f"var_comments_{plat}"),
            ("var_shares",     f"var_shares_{plat}"),
            ("var_engagement", f"var_engagement_{plat}"),
        ]
        for metric, col in pairs:
            if col not in df_raw.columns:
                continue
            for _, row in df_raw.iterrows():
                rec = {
                    "name": row.get("name"),
                    "platform": plat,
                    "metric": metric,
                    "value": pd.to_numeric(row.get(col), errors="coerce"),
                    "period_start": row.get(pstart) if pstart else None,
                    "period_end":   row.get(pend)   if pend   else None,
                }
                records.append(rec)

    if not records:
        # Se nada foi mapeado, salva um CSV vazio com header para não quebrar o front
        cols = ["name","platform","metric","period_start","period_end","value"]
        pd.DataFrame(columns=cols).to_csv(out_csv, index=False, encoding="utf-8")
        return

    out = pd.DataFrame.from_records(records)
    # garantir 1 casa decimal apenas na coluna numérica 'value'
    if "value" in out.columns:
        out["value"] = pd.to_numeric(out["value"], errors="coerce").round(1)
    out.to_csv(out_csv, index=False, encoding="utf-8", float_format="%.1f")

# ============================
# CLI
# ============================

def parse_args():
    ap = argparse.ArgumentParser(description="SIR Excel v6.1 (IO clean; metrics export; csv/xlsx)")
    ap.add_argument("--excel", required=True, help="Caminho do arquivo de métricas (XLSX ou CSV)")
    # guardamos como string; no main coergimos para int quando for "0","1",...
    ap.add_argument("--sheet", default="0", help="Nome/índice da sheet (só em XLSX)")
    ap.add_argument("--out-csv", default=None, help="CSV final de resultados (se omitido, deriva como __Resultado.csv)")
    ap.add_argument("--out-xlsx", default=None, help="XLSX final de resultados (opcional)")
    ap.add_argument("--out-dir", default=None, help="Diretório para salvar saídas; padrão: data/processed ou pasta do input")

    # Pesos das dimensões
    ap.add_argument("--w-presenca", type=float, default=12.0)
    ap.add_argument("--w-pop",      type=float, default=24.0)
    ap.add_argument("--w-ativ",     type=float, default=16.0)
    ap.add_argument("--w-eng",      type=float, default=28.0)
    ap.add_argument("--w-dif",      type=float, default=20.0)

    # Pesos por plataforma (DEPRECATED)
    # ap.add_argument("--w-facebook",  type=float, default=0.5)
    # ap.add_argument("--w-twitter",   type=float, default=0.1)
    # ap.add_argument("--w-instagram", type=float, default=1.0)
    # ap.add_argument("--w-tiktok",    type=float, default=1.0)

    # Normalização
    ap.add_argument("--piso_positivo",   type=float, default=1.0)
    ap.add_argument("--cap_min",         type=float, default=98.0)
    ap.add_argument("--dominance_factor",type=float, default=10.0)

    # Plots
    ap.add_argument("--plots-dir",  default=None)
    ap.add_argument("--bar-width",  type=float, default=12.0)
    ap.add_argument("--bar-height", type=float, default=6.0)
    ap.add_argument("--plot-prefix", default="SIR_")

    return ap.parse_args()

# ============================
# Pipeline
# ============================

def main():
    args = parse_args()

    # 1) Ler entrada (CSV/XLSX) e padronizar colunas
    #    - CSV ignora sheet
    #    - XLSX: coagir "0" -> 0 (índice), "Planilha1" permanece string
    ext = os.path.splitext(args.excel)[1].lower()
    if ext == ".csv":
        df_in = _read_table_any(args.excel)
    else:
        df_in = _read_table_any(args.excel, sheet_name=_coerce_sheet_arg(args.sheet))
    df_in, applied_map, faltas = canonicalize_columns(df_in)
    df_in = clean_numeric_dataframe_one_decimal(df_in)

    if applied_map:
        print("[INFO] Colunas renomeadas via sinônimos:")
        for k, v in applied_map.items():
            print(f"   - {k} -> {v}")
    if faltas:
        print("[WARN] Alguns grupos de colunas não foram encontrados (serão tratados como 0):")
        for f in faltas:
            print(f"   - padrão não encontrado: {f}")

    # 2) Pré-ponderação por plataforma
    platform_weights = {
    "facebook": getattr(args, "w_facebook", 1.0),
    "twitter": getattr(args, "w_twitter", 1.0),
    "instagram": getattr(args, "w_instagram", 1.0),
    "tiktok": getattr(args, "w_tiktok", 1.0),
        }
    df_weighted = apply_platform_weights(df_in, platform_weights)

    # 3) Dimensões brutas + presença (0–100)
    dims_raw = compute_dimensions_raw(df_weighted)
    dims_raw["presenca_100"] = compute_presence_score_0_100(dims_raw)

    # 4) POP/ATIV/ENG/DIF (0–100)
    dims_100 = to_scores_0_100_other_dims(dims_raw,
                                          piso_positivo=args.piso_positivo,
                                          cap_min=args.cap_min,
                                          dominance_factor=args.dominance_factor)

    # 5) Média ponderada final (0–100)
    weights = {"presenca": args.w_presenca, "popularidade": args.w_pop,
               "atividade": args.w_ativ, "engajamento": args.w_eng, "difusao": args.w_dif}
    result = weighted_final_score_0_100(dims_100, weights)

    # 6) Definir saídas derivadas
    auto_out_csv, metrics_csv = _derive_basenames(args.excel, args.out_dir)
    out_csv = args.out_csv or auto_out_csv
    out_xlsx = args.out_xlsx  # opcional

    # 7) Escrever resultados
    # 1 casa decimal e ponto como separador
    result.to_csv(out_csv, index=False, encoding="utf-8", float_format="%.1f")
    if out_xlsx:
        result.to_excel(out_xlsx, index=False)
    print(f"[OK] Resultado salvo em: {out_csv}")

    # 8) Exportar subset padronizado para aba Metrics (direto da planilha de métricas):
    export_metrics_long(df_in, metrics_csv)
    print(f"[OK] Metrics export salvo em: {metrics_csv}")

    # 9) Plots (opcional)
    if args.plots_dir and out_xlsx:
        cols_to_plot = [c for c in result.columns if c != "name"]
        make_all_bar_charts(
            results_xlsx=out_xlsx, sheet=0, output_dir=args.plots_dir,
            bar_width=args.bar_width, bar_height=args.bar_height, plot_prefix=args.plot_prefix,
            name_col="name", columns=cols_to_plot,
        )

    # 10) Preview
    print("\nPrévia do resultado (0–100):")
    print(result.head())

if __name__ == "__main__":
    main()
