// app/servicos/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Users, Gauge, Search, Share2, ArrowRight, Workflow, LineChart, Target } from 'lucide-react';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import Reveal from '@/components/ux/Reveal';
import StaggerList from '@/components/ux/StaggerList';

function SectionDivider({ from = '#170d4d', to = '#000000' }: { from?: string; to?: string }) {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full"
      style={{ background: `linear-gradient(90deg, ${from}, #3b25a1, ${to})` }}
    />
  );
}

const services = [
  {
    icon: Users,
    title: 'Pêndulo Digital',
    subtitle: 'Quem influencia?',
    desc: 'Índice proprietário de influência digital. Descubra em tempo real quem move o debate.',
    href: '/servicos/pendulo-digital',
  },
  {
    icon: Gauge,
    title: 'Pulso Público',
    subtitle: 'O que o público pensa?',
    desc: 'Surveys online rápidos e confiáveis para mapear opinião, intenção de voto e percepção.',
    href: '/servicos/pulso-publico',
  },
  {
    icon: Search,
    title: 'Lupa Social',
    subtitle: 'Como você é percebido?',
    desc: 'Social listening + análise de sentimento. Transforme ruído em informação estratégica.',
    href: '/servicos/lupa-social',
  },
  {
    icon: Share2,
    title: 'Rastro 360',
    subtitle: 'O que circula e impacta?',
    desc: 'Rastreamento de narrativas, slogans e mensagens. Entenda a disputa de narrativas.',
    href: '/servicos/rastro-360',
  },
];

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-[#170d4d] text-[#d9d9d9]">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden bg-black">
        <Image
          src="/bghero.png"
          alt=""
          fill
          priority
          className="absolute inset-0 object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <p className="uppercase tracking-widest text-xs sm:text-sm text-[#38d4b0]">
                nossas soluções
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Dados que viram decisões — no ritmo das redes
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-5 text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
                Quatro módulos integrados para ler influência, opinião, sentimento e narrativa em um só lugar.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="#solucoes"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-[#3b25a1] text-white font-semibold shadow-[0_10px_30px_rgba(59,37,161,0.35)] hover:brightness-110 transition"
                >
                  ver soluções <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 border border-[#38d4b0] text-[#d9d9d9] font-semibold hover:bg-[#38d4b0]/10 transition"
                >
                  fale com a gente
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider from="#000000" to="#170d4d" />

      {/* SOLUÇÕES */}
      <section id="solucoes" className="relative bg-[#170d4d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Quatro soluções, <span className="text-[#38d4b0]">uma visão completa</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
                Dashboards dinâmicos, atualizados em tempo real — sem PDFs estáticos.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <StaggerList step={90} y={20}>
              {services.map((s) => (
                <article
                  key={s.title}
                  className="
                    group rounded-2xl p-5 sm:p-6
                    bg-white/5 backdrop-blur
                    border border-[#38d4b0]/20
                    shadow-[0_10px_30px_rgba(0,0,0,0.20)]
                    transition-all duration-300 ease-out will-change-transform
                    motion-safe:hover:scale-[1.02] motion-safe:hover:-translate-y-1.5
                    hover:bg-white/10 hover:border-[#38d4b0]/35 hover:shadow-[0_18px_48px_rgba(0,0,0,0.35)]
                    min-w-0 break-words
                  "
                >
                  <div className="inline-flex items-center justify-center rounded-xl size-12 bg-[#38d4b0]/15 ring-1 ring-[#38d4b0]/30">
                    <s.icon className="h-6 w-6 text-[#38d4b0]" />
                  </div>
                  <h3 className="mt-4 text-xl sm:text-2xl font-semibold">{s.title}</h3>
                  <p className="text-sm sm:text-base text-[#d9d9d9]/70">{s.subtitle}</p>
                  <p className="mt-3 text-sm sm:text-base text-[#d9d9d9]/85">{s.desc}</p>

                  <div className="mt-5">
                    <Link
                      href={s.href}
                      className="inline-flex items-center gap-2 text-sm sm:text-base text-[#38d4b0] hover:text-[#38d4b0]/90"
                    >
                      ver detalhes <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </StaggerList>
          </div>
        </div>
      </section>

      <SectionDivider from="#170d4d" to="#D9D9D9" />

      {/* COMO ENTREGAMOS (mini-processo) */}
      <section className="relative bg-[#D9D9D9] text-[#3b25a1]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Como entregamos</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 text-base sm:text-lg lg:text-xl">
                Do dado à ação em quatro passos contínuos — pensados para velocidade e clareza.
              </p>
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              { icon: Workflow, title: 'Integração', desc: 'Conectamos fontes do digital e configuramos seus objetivos.' },
              { icon: LineChart, title: 'Leitura', desc: 'Métricas de influência, opinião e sentimento em um só lugar.' },
              { icon: Target, title: 'Recomendação', desc: 'Diagnósticos e próximos passos acionáveis (com contexto).' },
              { icon: ArrowRight, title: 'Acompanhamento', desc: 'Efeito das ações medido em ciclos curtos e constantes.' },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 90}>
                <div className="rounded-2xl p-5 sm:p-6 bg-white/70 border border-[#3b25a1]/15 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_48px_rgba(0,0,0,0.18)] transition-all">
                  <div className="inline-flex items-center justify-center rounded-xl size-12 bg-[#3b25a1]/10 ring-1 ring-[#3b25a1]/20">
                    <m.icon className="h-6 w-6 text-[#3b25a1]" />
                  </div>
                  <h3 className="mt-3 font-semibold text-lg sm:text-xl">{m.title}</h3>
                  <p className="mt-1.5 text-sm sm:text-base">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA inline opcional */}
          <Reveal delay={120}>
            <div className="mt-10 text-center">
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold bg-[#3b25a1] text-white shadow-[0_10px_30px_rgba(59,37,161,0.35)] hover:brightness-110 transition"
              >
                solicitar demonstração <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider from="#D9D9D9" to="#000000" />

      {/* CTA geral + footer */}
      <CTA />
      <Footer />
    </main>
  );
}