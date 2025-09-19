// app/sobre/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Target, LineChart, Users, Gauge, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import Nav from '@/components/Nav';

import Reveal from '@/components/ux/Reveal';
import StaggerList from '@/components/ux/StaggerList';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import Team from '@/components/sections/Team';

/** Divider de gradiente entre seções (inline para não depender de outros arquivos) */
function SectionGradient({
  from,
  to,
  height = 120,
  opacity = 1,
  variant = 'linear',
  flip = false,
  className = '',
}: {
  from: string;
  to: string;
  height?: number;
  opacity?: number;
  variant?: 'linear' | 'radial' | 'diagonal';
  flip?: boolean;
  className?: string;
}) {
  const mix = (f: string, g: string, t: number) => {
    const hexToRgb = (hex: string) => {
      const m = hex.replace('#', '');
      if (m.length !== 6) return null;
      return {
        r: parseInt(m.slice(0, 2), 16),
        g: parseInt(m.slice(2, 4), 16),
        b: parseInt(m.slice(4, 6), 16),
      };
    };
    const a = hexToRgb(f);
    const b = hexToRgb(g);
    if (!a || !b) return g;
    const lerp = (x: number, y: number) => Math.round(x + (y - x) * t);
    return `rgba(${lerp(a.r, b.r)}, ${lerp(a.g, b.g)}, ${lerp(a.b, b.b)}, 1)`;
  };

  let background = '';
  if (variant === 'linear') {
    background = flip
      ? `linear-gradient(180deg, ${to} 0%, ${mix(from, to, 0.5)} 50%, ${from} 100%)`
      : `linear-gradient(180deg, ${from} 0%, ${mix(from, to, 0.5)} 50%, ${to} 100%)`;
  } else if (variant === 'radial') {
    background = `radial-gradient(120% 120% at 50% 0%, ${from} 0%, ${mix(from, to, 0.5)} 50%, ${to} 85%)`;
  } else {
    const angle = flip ? 225 : 45;
    background = `linear-gradient(${angle}deg, ${from} 0%, ${mix(from, to, 0.5)} 50%, ${to} 100%)`;
  }

  return (
    <div
      aria-hidden
      className={`w-full ${className}`}
      style={{ height, opacity, background }}
    />
  );
}

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-[#170d4d] text-[#d9d9d9]">
      <Nav />

      {/* HERO SOBRE */}
      <section className="relative overflow-hidden bg-[#000] text-[#d9d9d9]">
        <Image
          src="/bghero.png"
          alt=""
          fill
          priority
          className="absolute inset-0 object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="uppercase tracking-widest text-xs sm:text-sm text-[#38d4b0]">
                  sobre a <strong>DADODADO</strong>
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Insights estratégicos para decisões que importam
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 max-w-2xl text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
                  Unimos dados e estratégia para oferecer leitura contínua de influência,
                  opinião, sentimento e narrativas — transformando sinais do digital em ação.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="/servicos"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 w-full sm:w-auto bg-[#3b25a1] text-white font-semibold shadow-[0_10px_30px_rgba(59,37,161,0.35)] hover:brightness-110 transition"
                  >
                    nossas soluções <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/contato"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 w-full sm:w-auto border border-[#38d4b0] text-[#d9d9d9] font-semibold hover:bg-[#38d4b0]/10 transition"
                  >
                    fale com a gente
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSIÇÃO */}
      <SectionGradient from="#000000" to="#170d4d" height={120} variant="linear" />

      {/* QUEM SOMOS */}
      <section className="relative bg-[#170d4d] text-[#d9d9d9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start content-start">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Quem somos</h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-4 text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
                  Uma equipe multidisciplinar dedicada a construir uma visão integrada do ecossistema digital:
                  de quem influencia ao que o público pensa — e principalmente, o que fazer com isso.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <StaggerList step={90} y={20}>
                  {[
                    { icon: Users, title: 'Leitura de influência', desc: 'Identificamos quem move o debate e como as redes se articulam.' },
                    { icon: Gauge, title: 'Pulso de opinião', desc: 'Pesquisa online com velocidade e rigor para decisões no tempo certo.' },
                    { icon: ShieldCheck, title: 'Confiabilidade', desc: 'Métricas rastreáveis, fontes claras e metodologia transparente.' },
                    { icon: Sparkles, title: 'Clareza acionável', desc: 'Dashboards e recomendações objetivas para comunicação e estratégia.' },
                  ].map((f) => (
                    <div
                      key={f.title}
                      className="
                        min-w-0 break-words
                        rounded-2xl p-5 sm:p-6
                        bg-white/5 backdrop-blur
                        border border-[#38d4b0]/20
                        shadow-[0_10px_30px_rgba(0,0,0,0.20)]
                        transition-all duration-300 hover:shadow-[0_18px_48px_rgba(0,0,0,0.35)]
                        will-change-transform
                      "
                    >
                      <div className="inline-flex items-center justify-center rounded-xl size-12 bg-[#38d4b0]/15 ring-1 ring-[#38d4b0]/30">
                        <f.icon className="h-6 w-6 text-[#38d4b0]" />
                      </div>
                      <h3 className="mt-3 font-semibold text-lg sm:text-xl">{f.title}</h3>
                      <p className="mt-1.5 text-sm sm:text-base text-[#d9d9d9]/85">{f.desc}</p>
                    </div>
                  ))}
                </StaggerList>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⬇️ Mover o Team para fora da seção acima evita conflitos de layout */}
      <Team />

      {/* TRANSIÇÃO */}
      <SectionGradient from="#170d4d" to="#D9D9D9" height={2} variant="linear" />

      {/* COMO TRABALHAMOS / METODOLOGIA */}
      <section className="relative bg-[#D9D9D9] text-[#3b25a1]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Como trabalhamos</h2>
            <p className="mt-4 text-base sm:text-lg lg:text-xl">
              Integramos cinco soluções modulares em um único ambiente: influência, opinião, sentimento, narrativa e atitude.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
            {[
              { icon: Users, title: 'Pêndulo Digital', desc: 'Índice proprietário de influência — quem move a conversa.' },
              { icon: Gauge, title: 'Pulso Público', desc: 'Surveys online para mapear opinião e variações.' },
              { icon: LineChart, title: 'Lupa Social', desc: 'Listening + sentimento para entender percepção.' },
              { icon: Sparkles, title: 'Rastro 360', desc: 'Rastreamento de narrativas, slogans e mensagens.' },
              { icon: MessageSquare, title: 'Voz Ativa', desc: 'Grupos focais e entrevistas para pesquisa qualitativa.' },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 90}>
                <div
                  className="
                    min-w-0 break-words
                    group rounded-2xl p-5 sm:p-6
                    bg-white/70 border border-[#3b25a1]/15
                    shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                    transition-all duration-300 hover:shadow-[0_18px_48px_rgba(0,0,0,0.18)]
                  "
                >
                  <div className="inline-flex items-center justify-center rounded-xl size-12 bg-[#3b25a1]/10 ring-1 ring-[#3b25a1]/20">
                    <m.icon className="h-6 w-6 text-[#3b25a1]" />
                  </div>
                  <h3 className="mt-3 font-semibold text-lg sm:text-xl">{m.title}</h3>
                  <p className="mt-1.5 text-sm sm:text-base text-[#3b25a1]">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSIÇÃO */}
      <SectionGradient from="#D9D9D9" to="#000000" height={2} variant="linear" />

      {/* NÚMEROS / PROVA SOCIAL */}
      <section className="relative bg-black text-[#d9d9d9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Resultados em foco</h2>
            <p className="mt-3 text-base sm:text-lg lg:text-xl text-[#d9d9d9]/80">
              Métricas que importam para decisão.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
            {[
              { k: '98%', v: 'satisfação' },
              { k: '24/7', v: 'monitoramento' },
              { k: '10x', v: 'agilidade' },
              { k: '360°', v: 'visão integrada' },
            ].map((s) => (
              <div
                key={s.k}
                className="min-w-0 break-words rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-6 text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold">{s.k}</div>
                <div className="mt-1 text-sm sm:text-base text-[#d9d9d9]/85">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </main>
  );
}
