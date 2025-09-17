// components/Hero.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/ux/Reveal";
import StaggerList from "@/components/ux/StaggerList";

export default function Hero() {
  return (
    <section className="relative bg-[#0a0f1a] text-white">
      {/* BG base */}
      <Image
        src="/bghero.png"
        alt=""
        fill
        priority
        className="absolute inset-0 z-0 object-cover"
      />

      {/* Gradiente de profundidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      {/* Overlay uniforme (shadow no bg inteiro) */}
      <div className="absolute inset-0 bg-black/55 z-[1] pointer-events-none" />

      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10">
          {/* Bloco de texto */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="uppercase tracking-widest text-xs sm:text-sm text-cyan-300/80">
                INSIGHTS ESTRATÉGICOS
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Transformamos dados em{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  decisões estratégicas
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 max-w-2xl text-sm sm:text-base lg:text-lg text-gray-300">
                Central de inteligência para compreender{" "}
                <strong>influência, opinião, sentimento e narrativa</strong> em tempo real.
                Do social listening à pesquisa online, insights claros e acionáveis para marcas,
                políticos e organizações.
              </p>
            </Reveal>

            {/* CTAs com stagger */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <StaggerList step={90} y={16}>
              <Link
                href="/contato"
                className="
                  inline-flex items-center justify-center gap-2 rounded-xl
                  px-5 py-3 w-full sm:w-auto
                  bg-white text-black hover:bg-gray-100 transition
                  focus:outline-none focus:ring-2 focus:ring-cyan-300/50
                "
              >
                Solicite uma demonstração <ArrowRight size={18} />
              </Link>

              <Link
                href="/servicos"
                className="
                  inline-flex items-center justify-center gap-2 rounded-xl
                  px-5 py-3 w-full sm:w-auto
                  border border-white/30 hover:border-white/60 transition
                  focus:outline-none focus:ring-2 focus:ring-cyan-300/40
                "
              >
                Ver soluções
              </Link>
            </StaggerList>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
