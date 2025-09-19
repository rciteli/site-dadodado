// app/servicos/rastro-360/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import Reveal from '@/components/ux/Reveal';
import StaggerList from '@/components/ux/StaggerList';
import {
  Share2, Megaphone, GitBranch, Network, Route, Waves,
  BarChart3, LineChart, Target, Filter, BellRing, ArrowRight, Hash
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

export default function Rastro360Page() {
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
                serviço • rastreamento de narrativas
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                entrar em contato
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-5 text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
                Mapeie <strong>narrativas, slogans e mensagens</strong> que circulam entre canais, identifique
                <strong> origens</strong>, <strong>rotas de difusão</strong>, <strong>atores-chave</strong> e impactos —
                com alertas e recomendações práticas.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-[#3b25a1] text-white font-semibold shadow-[0_10px_30px_rgba(59,37,161,0.35)] hover:brightness-110 transition"
                >
                  saber mais <ArrowRight size={18} />
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
                  Um módulo para <strong>rastrear narrativas</strong> de ponta a ponta: origem, evolução, canais,
                  <strong> hubs de propagação</strong> e <strong>impacto</strong>. Ideal para comunicação, reputação e produto — quando
                  entender o <em>como</em> e o <em>porquê</em> da circulação faz a diferença.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4">
              <StaggerList step={90} y={20}>
                {[
                  { icon: Share2,    label: 'Da origem ao alcance',      desc: 'Rota da mensagem: onde nasce, por onde passa e onde ganha força.' },
                  { icon: Network,   label: 'Hubs & atores',              desc: 'Quem impulsiona, quem referencia e onde a mensagem trava.' },
                  { icon: Megaphone, label: 'Competição de frames',       desc: 'Como diferentes narrativas disputam atenção ao mesmo tempo.' },
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

      {/* 5 DIMENSÕES */}
      <section className="relative bg-[#170d4d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <Reveal><h2 className="text-2xl sm:text-3xl font-bold">As dimensões do <strong>Rastro</strong></h2></Reveal>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <StaggerList step={70} y={14}>
              {[
                { icon: Hash,       title: 'Narrativas',           desc: 'Agrupamento por slogan/tema; variantes e coocorrências.' },
                { icon: GitBranch,  title: 'Evolução',             desc: 'Como a narrativa se bifurca em versões e contra-frames.' },
                { icon: Network,    title: 'Atores & hubs',        desc: 'Perfis, veículos e comunidades que amplificam.' },
                { icon: Route,      title: 'Caminhos de difusão',  desc: 'Sequência de canais/atores que levam ao alcance.' },
                { icon: Waves,      title: 'Penetração & impacto', desc: 'Onde pega (segmentos/canais) e efeitos associados.' },
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
                { icon: BarChart3, title: 'Overview de narrativas', desc: 'Volume, tração e penetração por período/canal.' },
                { icon: LineChart, title: 'Séries & viradas',       desc: 'Picos e mudanças com amostras explicativas.' },
                { icon: Network,   title: 'Mapa de atores',         desc: 'Hubs, comunidades e rotas de propagação.' },
                { icon: Share2,    title: 'Difusão & caminhos',     desc: 'Sequência de compartilhamentos/reposts por narrativa.' },
                { icon: Filter,    title: 'Comparação de frames',   desc: 'Disputa entre narrativas e contra-narrativas.' },
                { icon: Target,    title: 'Recomendações',          desc: 'Ações por canal/segmento para inserir ou neutralizar.' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-center">Rastro 360</h2>
          </Reveal>

          <div className="mt-8 mx-auto max-w-3xl">
            <div
              className="
                relative overflow-hidden rounded-2xl p-6 sm:p-8
                bg-white/90 border border-[#3b25a1]/15
                shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              "
            >

              <div className="flex flex-col gap-5 sm:gap-6">
                <div>
                  <p className="mt-2 text-[#3b25a1]/90">
                    Acesso completo a narrativas, rotas de difusão, hubs e comparações de frames — com séries,
                    alertas e recomendações. Inclui suporte e Q&amp;A.
                  </p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  {[
                    'Overview de narrativas e disputa de frames',
                    'Mapa de atores e hubs com rotas de propagação',
                    'Séries, picos e amostras explicativas',
                    'Recomendações acionáveis por canal/segmento',
                    'Relatório recorrente (freq. ajustável) + suporte',
                    'Configuração de dicionários e aliases por narrativa',
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
                    entrar em contato
                    <ArrowRight size={18} />
                  </Link>
                </div>
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
