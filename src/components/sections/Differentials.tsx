// components/sections/Differentials.tsx
import { Rocket, ShieldCheck, Gauge, Sparkles } from "lucide-react";

const items = [
  { icon: Rocket, title: "Velocidade", desc: "Insights em tempo real." },
  { icon: ShieldCheck, title: "Confiabilidade", desc: "Dados direto do digital." },
  { icon: Gauge, title: "Eficiência", desc: "Mais barato e ágil que pesquisas de campo." },
  { icon: Sparkles, title: "Clareza", desc: "Visão integrada: influência, opinião, sentimento e narrativa." },
];

export default function Differentials() {
  return (
    <section className="relative bg-[#170d4d]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#d9d9d9]">
            O Diferencial{" "}
            <span className="font-normal">
              <strong>DADO</strong>DADO
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
            Velocidade, confiabilidade e clareza para decisões estratégicas.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {items.map((i) => (
            <div
              key={i.title}
              className="
                group rounded-2xl p-5 sm:p-6
                bg-white/5 backdrop-blur
                border border-[#38d4b0]/20
                shadow-[0_10px_30px_rgba(0,0,0,0.20)]
                transition-all duration-300 ease-out will-change-transform
                motion-safe:hover:scale-[1.02] motion-safe:hover:-translate-y-1.5
                hover:bg-white/10 hover:border-[#38d4b0]/35 hover:shadow-[0_18px_48px_rgba(0,0,0,0.35)]
                focus-within:ring-2 focus-within:ring-[#38d4b0]/50
              "
              tabIndex={-1}
            >
              <div className="inline-flex items-center justify-center rounded-xl size-12 bg-[#38d4b0]/15 ring-1 ring-[#38d4b0]/30">
                <i.icon className="h-6 w-6 text-[#38d4b0]" />
              </div>

              <h3 className="mt-4 font-semibold text-xl sm:text-2xl text-[#d9d9d9]">
                {i.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#d9d9d9]/85">
                {i.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* linha decorativa inferior opcional */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#38d4b0] via-[#3b25a1] to-[#38d4b0]" />
    </section>
  );
}
