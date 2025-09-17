// components/dividers/SectionGradient.tsx
type Variant = "linear" | "radial" | "diagonal";

type Props = {
  /** Cor de cima (seção anterior) */
  from: string;
  /** Cor de baixo (próxima seção) */
  to: string;
  /** Altura da faixa (px) */
  height?: number;
  /** Opacidade total do gradiente (0–1) */
  opacity?: number;
  /** linear | radial | diagonal */
  variant?: Variant;
  /** Inverte a direção (para linear/diagonal) */
  flip?: boolean;
  /** Classe extra (ex.: mt-[-1px]) */
  className?: string;
};

export default function SectionGradient({
  from,
  to,
  height = 120,
  opacity = 1,
  variant = "linear",
  flip = false,
  className = "",
}: Props) {
  const style: React.CSSProperties = { height, opacity };

  let background = "";

  if (variant === "linear") {
    // top -> bottom (ou invertido)
    background = flip
      ? `linear-gradient(180deg, ${to} 0%, ${mix(from,to,0.5)} 45%, ${from} 100%)`
      : `linear-gradient(180deg, ${from} 0%, ${mix(from,to,0.5)} 55%, ${to} 100%)`;
  }

  if (variant === "radial") {
    // “spot” suave no meio
    background = `radial-gradient(120% 120% at 50% 0%, ${from} 0%, ${mix(from,to,0.5)} 45%, ${to} 85%)`;
  }

  if (variant === "diagonal") {
    // leve ângulo (↘ ou ↗ se flip)
    const angle = flip ? 225 : 45;
    background = `linear-gradient(${angle}deg, ${from} 0%, ${mix(from,to,0.5)} 50%, ${to} 100%)`;
  }

  return (
    <div
      aria-hidden
      className={`w-full ${className}`}
      style={{ ...style, background }}
    />
  );
}

/**
 * Mistura simples de cores (from/to) por fator t [0..1]
 * Aceita hex #rrggbb; retorna rgba para suavizar
 */
function mix(from: string, to: string, t: number) {
  const f = hexToRgb(from);
  const g = hexToRgb(to);
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
  if (!f || !g) return to;
  return `rgba(${lerp(f.r, g.r)}, ${lerp(f.g, g.g)}, ${lerp(f.b, g.b)}, 1)`;
}
function hexToRgb(hex: string) {
  const m = hex.replace("#", "");
  if (m.length !== 6) return null;
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return { r, g, b };
}
