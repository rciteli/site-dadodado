// components/sections/Solutions.tsx
import Link from "next/link";
import { Users, Gauge, Search, Share2, ArrowRight } from "lucide-react";
import Reveal from "@/components/ux/Reveal";
import StaggerList from "@/components/ux/StaggerList";

const cards = [
  { title: "Pêndulo Digital", subtitle: "Quem influencia?", icon: Users,
    desc: "Índice proprietário de influência digital. Descubra em tempo real quem move o debate." },
  { title: "Pulso Público", subtitle: "O que o público pensa?", icon: Gauge,
    desc: "Surveys online rápidos e confiáveis para mapear opinião, intenção de voto e percepção." },
  { title: "Lupa Social", subtitle: "Como você é percebido?", icon: Search,
    desc: "Social listening + análise de sentimento. Transforme ruído em informação estratégica." },
  { title: "Rastro 360", subtitle: "O que circula e o que impacta?", icon: Share2,
    desc: "Rastreamento de narrativas, slogans e mensagens. Entenda a disputa de narrativas." },
];

export default function Solutions() {
  return (
    <section className="relative bg-[#170d4d]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <div className="text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#38d4b0]">
              Quatro soluções,
              <br />
              <span className="text-[#d9d9d9]">uma visão completa</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
              Um app centralizado com <strong className="text-[#38d4b0]">quatro soluções modulares</strong>.
              <br />
              Dashboards dinâmicos e atualizados em tempo real — sem relatórios estáticos.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerList step={90} y={20}>
            {cards.map((c) => (
              <div
                key={c.title}
                className="
                  group rounded-2xl p-5 sm:p-6
                  bg-white/5 backdrop-blur
                  border border-[#38d4b0]/20
                  shadow-[0_10px_30px_rgba(0,0,0,0.20)]
                  transition-all duration-300 ease-out will-change-transform
                  flex flex-col
                  motion-safe:hover:scale-[1.02] motion-safe:hover:-translate-y-1.5
                  hover:bg-white/10 hover:border-[#38d4b0]/35 hover:shadow-[0_18px_48px_rgba(0,0,0,0.35)]
                  focus-within:ring-2 focus-within:ring-[#38d4b0]/50
                "
                tabIndex={-1}
              >
                <div className="inline-flex items-center justify-center rounded-xl size-12 bg-[#38d4b0]/15 ring-1 ring-[#38d4b0]/30">
                  <c.icon className="h-6 w-6 text-[#38d4b0]" />
                </div>

                <h3 className="mt-4 font-semibold text-xl sm:text-2xl text-[#d9d9d9]">
                  {c.title}
                </h3>
                <p className="text-sm sm:text-base text-[#d9d9d9]/70">
                  {c.subtitle}
                </p>
                <p className="mt-3 text-sm sm:text-base text-[#d9d9d9]/85">
                  {c.desc}
                </p>

                <div className="mt-4 sm:mt-5">
                  <Link
                    href={`/servicos/${encodeURIComponent(c.title.toLowerCase().replace(/\s+/g, "-"))}`}
                    className="
                      inline-flex items-center gap-2
                      text-sm sm:text-base
                      text-[#38d4b0] hover:text-[#38d4b0]/90
                      focus:outline-none focus:ring-2 focus:ring-[#38d4b0]/60 focus:ring-offset-2 focus:ring-offset-transparent rounded-full px-1
                    "
                  >
                    Ver detalhes <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </StaggerList>
        </div>
      </div>

      {/* linha decorativa inferior opcional */}
      <div className="flex items-center justify-center">
        <svg width="998" height="5" viewBox="0 0 998 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-0.000976563 2.98633C16.6324 3.11966 33.2658 3.24633 49.8991 3.36633C199.599 4.44633 349.3 4.98633 499 4.98633C648.7 4.98633 798.401 4.44633 948.101 3.36633C964.734 3.24633 981.368 3.11966 998.001 2.98633C981.368 2.85299 964.734 2.72633 948.101 2.60633C798.401 1.52633 648.7 0.986328 499 0.986328C349.3 0.986328 199.599 1.52633 49.8991 2.60633C33.2658 2.72633 16.6324 2.85299 -0.000976563 2.98633Z" fill="#3b25a1" />
        </svg>
      </div>
    </section>
  );
}
