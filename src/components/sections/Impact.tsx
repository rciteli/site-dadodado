// components/sections/Impact.tsx
import { TrendingUp, Target, Megaphone } from "lucide-react";

export default function Impact() {
  const cards = [
    { icon: TrendingUp, title: "Tendências & Crises", desc: "Detectamos tendências emergentes, crises e oportunidades para agir no timing certo." },
    { icon: Target,      title: "Impacto Real",       desc: "Medimos impacto e influência junto ao público, com leitura contínua do efeito das ações." },
    { icon: Megaphone,   title: "Decisão com Clareza",desc: "Informação objetiva para decisões em comunicação, reputação, política e marketing." },
  ];

  return (
    <section className="relative overflow-hidden bg-black text-[#d9d9d9]">
      {/* Glows / shapes de marca (responsivos) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 -left-24 h-[360px] w-[360px] sm:h-[520px] sm:w-[520px] rounded-full blur-3xl opacity-50 sm:opacity-70"
          style={{ background: "radial-gradient(40% 40% at 50% 50%, rgba(56,212,176,0.25), transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 -right-24 h-[320px] w-[320px] sm:h-[460px] sm:w-[460px] rounded-full blur-3xl opacity-45 sm:opacity-60"
          style={{ background: "radial-gradient(40% 40% at 50% 50%, rgba(59,37,161,0.22), transparent 70%)" }}
        />
      </div>

      {/* Grid sutil + vinheta */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 shadow-[inset_0_0_120px_rgba(0,0,0,0.7)] sm:shadow-[inset_0_0_160px_rgba(0,0,0,0.8)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Cabeçalho */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            O impacto <span className="text-[#38d4b0] font-normal"><strong>DADO</strong>DADO</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
            Resultados visíveis, com leitura contínua de influência e efeito no público.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((c) => (
            <article
              key={c.title}
              className="
                group relative overflow-hidden rounded-2xl p-5 sm:p-6
                bg-white/5 backdrop-blur
                border border-white/10
                shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                transition-all duration-300 ease-out will-change-transform
                motion-safe:hover:scale-[1.02] motion-safe:hover:-translate-y-1.5
                hover:bg-white/10 hover:shadow-[0_18px_48px_rgba(0,0,0,0.45)]
                focus-within:ring-2 focus-within:ring-[#38d4b0]/50
              "
              tabIndex={-1}
            >
              {/* Halo/realce no hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: "inset 0 0 0 1px rgba(56,212,176,0.35), 0 0 0 8px rgba(56,212,176,0.08)" }}
              />

              {/* Ícone em “chip” */}
              <div className="inline-flex items-center justify-center rounded-xl size-12 bg-[#38d4b0]/15 ring-1 ring-[#38d4b0]/30">
                <c.icon className="h-6 w-6 text-[#38d4b0]" />
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm sm:text-base text-[#d9d9d9]/85">{c.desc}</p>

              {/* Linha/acento inferior do card */}
              <div className="mt-6 h-px w-16 sm:w-20 bg-[#38d4b0]/60" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
