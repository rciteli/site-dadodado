// app/servicos/pulso-publico/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import Reveal from '@/components/ux/Reveal';
import StaggerList from '@/components/ux/StaggerList';
import {
  Gauge, Users, ClipboardCheck, BarChart3, Target, ArrowRight,
  ListChecks, Activity, LineChart, Settings2, ShieldCheck, Clock3, Filter
} from 'lucide-react';

function Divider({ from = '#000000', to = '#170d4d' }: { from?: string; to?: string }) {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full"
      style={{ background: `linear-gradient(90deg, ${from}, #3b25a1, ${to})` }}
    />
  );
}

export default function PulsoPublicoPage() {
  return (
    <main className="min-h-screen bg-[#170d4d] text-[#d9d9d9]">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden bg-black">
        <Image src="/bghero.png" alt="" fill priority className="absolute inset-0 object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <Reveal>
              <p className="uppercase tracking-widest text-xs sm:text-sm text-[#38d4b0]">
                serviço • pesquisa online rápida e confiável
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Pulso Público
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-5 text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
                Surveys online com <strong>plano amostral</strong>, <strong>ponderação</strong> e <strong>calibração</strong>,
                para medir opinião, intenção e percepção com velocidade — e com rigor estatístico.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-[#3b25a1] text-white font-semibold shadow-[0_10px_30px_rgba(59,37,161,0.35)] hover:brightness-110 transition"
                >
                  solicitar demo <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Divider from="#000000" to="#170d4d" />

      {/* O QUE É */}
      <section className="relative bg-[#170d4d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">O que é</h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-3 text-[#d9d9d9]/85">
                  Um módulo de <strong>pesquisa online</strong> que combina captação ágil (ads segmentados) e precisão metodológica para entregar leituras <strong>confiáveis</strong> de opinião e variação ao longo do tempo.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4">
              <StaggerList step={90} y={20}>
                {[
                  { icon: Users, label: 'Foco nos públicos', desc: 'Recortes por demografia, região, interesse e intenção.' },
                  { icon: ClipboardCheck, label: 'Rigor de questionário', desc: 'Questões curtas, ordem controlada e checagens de atenção.' },
                  { icon: BarChart3, label: 'Leitura por variação', desc: 'Comparativos por onda e efeito de campanhas/eventos.' },
                ].map((f) => (
                  <div key={f.label} className="rounded-2xl p-5 bg-white/5 border border-[#38d4b0]/20 backdrop-blur">
                    <f.icon className="h-6 w-6 text-[#38d4b0]" />
                    <h3 className="mt-3 font-semibold text-lg">{f.label}</h3>
                    <p className="text-sm text-[#d9d9d9]/85">{f.desc}</p>
                  </div>
                ))}
              </StaggerList>
            </div>
          </div>
        </div>
      </section>

      {/* COMO MEDIMOS — 5 DIMENSÕES */}
      <section className="relative bg-[#170d4d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <Reveal><h2 className="text-2xl sm:text-3xl font-bold">As 5 dimensões do Pulso</h2></Reveal>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <StaggerList step={70} y={14}>
              {[
                { icon: ListChecks, title: 'Questionário', desc: 'Clareza, ordem, controles de atenção e tempo de resposta.' },
                { icon: Users, title: 'Amostra', desc: 'Composição, tamanho efetivo (n) e cobertura por estratos.' },
                { icon: Settings2, title: 'Calibração', desc: 'Pós-estratificação / rake e ajustes de ponderação.' },
                { icon: ShieldCheck, title: 'Confiabilidade', desc: 'Erro amostral, intervalo de confiança e consistência de onda.' },
                { icon: Gauge, title: 'Eficiência', desc: 'Menos tempo de campo, baixo custo e ganho de produtividade.' },
              ].map((d) => (
                <div key={d.title} className="rounded-2xl p-5 bg-white/5 border border-[#38d4b0]/20">
                  <d.icon className="h-6 w-6 text-[#38d4b0]" />
                  <h4 className="mt-2 font-semibold">{d.title}</h4>
                  <p className="text-sm text-[#d9d9d9]/85">{d.desc}</p>
                </div>
              ))}
            </StaggerList>
          </div>
        </div>
      </section>

      {/* DASHBOARD & ENTREGAS */}
      <section className="relative bg-[#170d4d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <Reveal><h2 className="text-2xl sm:text-3xl font-bold">Dashboard & entregas</h2></Reveal>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <StaggerList step={80} y={14}>
              {[
                { icon: BarChart3, title: 'Overview', desc: 'Métricas principais, margens e variação entre ondas.' },
                { icon: LineChart, title: 'Séries temporais', desc: 'Evolução das métricas por período.' },
                { icon: Target, title: 'Diagnóstico por público', desc: 'Recortes por demografia/região/interesse e recomendações.' },
                { icon: Filter, title: 'Dashboard', desc: 'Resultados por item, filtros por segmento e comparação histórica.' },
                { icon: Clock3, title: 'Timing de ação', desc: 'Leituras curtas para reação a campanhas e eventos.' },
                { icon: ShieldCheck, title: 'Metodologia', desc: 'Amostra, pesos, erro e intervalos sempre visíveis.' },
              ].map((i) => (
                <div key={i.title} className="rounded-2xl p-5 bg-white/5 border border-[#38d4b0]/20">
                  <i.icon className="h-6 w-6 text-[#38d4b0]" />
                  <h4 className="mt-2 font-semibold">{i.title}</h4>
                  <p className="text-sm text-[#d9d9d9]/85">{i.desc}</p>
                </div>
              ))}
            </StaggerList>
          </div>
        </div>
      </section>

      {/* PLANO PREMIUM (ÚNICO) */}
      <section className="relative bg-[#D9D9D9] text-[#3b25a1]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-center">Plano Premium</h2>
          </Reveal>

          <div className="mt-8 mx-auto max-w-3xl">
            <div
              className="
                relative overflow-hidden rounded-2xl p-6 sm:p-8
                bg-white/90 border border-[#3b25a1]/15
                shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              "
            >
              {/* Badge oferta */}
              <div className="absolute top-3 right-4">
                <span className="inline-block rounded-full bg-[#3b25a1] px-3 py-1 text-xs font-semibold text-white shadow">
                  1 relatório gratuito na demo
                </span>
              </div>

              <div className="flex flex-col gap-5 sm:gap-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Pulso Público — Premium</h3>
                  <p className="mt-2 text-[#3b25a1]/90">
                    Acesso completo a questionários, recortes de público, variações entre ondas e recomendações — com metodologia visível,
                    relatório recorrente e suporte.
                  </p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  {[
                    'Questionário otimizado + checagens de qualidade',
                    'Recortes por público (demografia/região/interesse)',
                    'Séries e variações com significância destacada',
                    'Recomendações por público e oportunidade',
                    'Relatório recorrente (freq. ajustável) + suporte',
                    'Metodologia: amostra, pesos e intervalos de confiança',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#3b25a1]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="/contato"
                    className="
                      inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold
                      bg-[#3b25a1] text-white
                      shadow-[0_10px_30px_rgba(59,37,161,0.35)]
                      hover:brightness-110 transition
                    "
                  >
                    solicitar demonstração gratuita
                    <ArrowRight size={18} />
                  </Link>
                </div>

                <p className="text-xs text-[#3b25a1]/70">
                  *A demonstração inclui 1 relatório gratuito com recorte de período e escopo definidos no agendamento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
