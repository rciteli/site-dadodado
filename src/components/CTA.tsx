// components/CTA.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-black text-[#d9d9d9]">
      {/* Glows da marca (reduzidos no mobile) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -left-24 h-[360px] w-[360px] sm:h-[520px] sm:w-[520px] rounded-full blur-3xl opacity-50 sm:opacity-70"
          style={{ background: "radial-gradient(40% 40% at 50% 50%, rgba(56,212,176,0.25), transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 right-[-6rem] h-[320px] w-[320px] sm:h-[520px] sm:w-[520px] rounded-full blur-3xl opacity-45 sm:opacity-60"
          style={{ background: "radial-gradient(40% 40% at 50% 50%, rgba(59,37,161,0.28), transparent 70%)" }}
        />
      </div>

      {/* Vinheta sutil para foco */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.7)] sm:shadow-[inset_0_0_160px_rgba(0,0,0,0.8)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-12">
          {/* Texto + CTAs */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Pronto para transformar{" "}
              <span className="whitespace-nowrap">dados em resultados?</span>
            </h2>

            <p className="mt-4 max-w-xl text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
              Entre em contato e descubra como a <strong>DADO</strong>DADO pode apoiar sua estratégia.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* CTA primário */}
              <Link
                href="/contato"
                className="
                  inline-flex items-center justify-center gap-2 rounded-full
                  px-6 py-3 w-full sm:w-auto
                  bg-[#3b25a1] text-white font-semibold
                  shadow-[0_8px_24px_rgba(59,37,161,0.35)]
                  hover:brightness-110 transition
                  focus:outline-none focus:ring-2 focus:ring-[#38d4b0]/60 focus:ring-offset-2 focus:ring-offset-black
                "
                aria-label="Fale com a gente"
              >
                fale com a gente <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Selo/quote/logos em glass */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white/5 backdrop-blur p-5 sm:p-6 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <p className="text-sm sm:text-base lg:text-lg text-[#d9d9d9]/90">
                “Com a <strong>DADO</strong>DADO, monitoramos narrativas e percepção em tempo real — e
                transformamos insight em ação em poucos cliques.”
              </p>
              <div
                className="
                  mt-4 inline-flex items-center justify-center rounded-full
                  px-4 py-2 text-xs sm:text-sm
                  bg-white/10 text-[#d9d9d9]/90
                "
              >
                João Nonato, CEO
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
