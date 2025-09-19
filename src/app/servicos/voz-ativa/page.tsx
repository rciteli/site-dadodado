// app/servicos/voz-ativa/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import Reveal from '@/components/ux/Reveal';
import StaggerList from '@/components/ux/StaggerList';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Video,
  Users,
  Filter,
  FileText,
  BarChart3,
  Quote,
  Target,
  LayoutGrid,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Voz Ativa — DADODADO',
  description:
    'Grupos focais remotos que revelam o que motiva atitudes, crenças e decisões — recrutamento segmentado, moderação especializada e entregas ágeis.',
  alternates: { canonical: 'https://seu-dominio.com/servicos/voz-ativa' },
  openGraph: {
    type: 'website',
    url: 'https://seu-dominio.com/servicos/voz-ativa',
    siteName: 'DADODADO',
    title: 'Voz Ativa — Pesquisa qualitativa online',
    description:
      'Grupos focais remotos que revelam o que motiva atitudes, crenças e decisões — recrutamento segmentado, moderação especializada e entregas ágeis.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voz Ativa — Pesquisa qualitativa online',
    description:
      'Grupos focais remotos que revelam o que motiva atitudes, crenças e decisões — recrutamento segmentado, moderação especializada e entregas ágeis.',
  },
};

function Divider({ from = '#000000', to = '#170d4d' }: { from?: string; to?: string }) {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full"
      style={{ background: `linear-gradient(90deg, ${from}, #3b25a1, ${to})` }}
    />
  );
}

export default function VozAtivaPage() {
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
                serviço • pesquisa qualitativa online
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Voz Ativa
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-5 text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
                Grupos focais remotos que mergulham no que as pessoas realmente pensam — percepção
                profunda e comparativa para revelar o que motiva atitudes, crenças e decisões.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-[#3b25a1] text-white font-semibold shadow-[0_10px_30px_rgba(59,37,161,0.35)] hover:brightness-110 transition"
                >
                  entrar em contato <ArrowRight size={18} />
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
                  Uma metodologia de <strong>grupos focais síncronos online</strong> que conecta
                  participantes por <strong>vídeo</strong>, conduzidos por <strong>moderador especializado</strong>,
                  para extrair narrativas ricas, emoções, percepções e <strong>insights acionáveis</strong> — com
                  <strong> recrutamento digital segmentado</strong> para atingir exatamente quem interessa.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4">
              <StaggerList step={90} y={20}>
                {[
                  {
                    icon: Video,
                    label: 'Interativo e ao vivo',
                    desc: 'Interações face-a-face que estimulam dinâmica de grupo, debate e construção de ideias.',
                  },
                  {
                    icon: Users,
                    label: 'Recrutamento preciso',
                    desc: 'Anúncios segmentados + screener especializado para garantir perfis alinhados ao objetivo.',
                  },
                  {
                    icon: FileText,
                    label: 'Análises profundas, entregas ágeis',
                    desc: 'Sessões gravadas, transcrições, códigos temáticos e síntese focada em decisão — sem esperas longas.',
                  },
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

      {/* AS DIMENSÕES DA VOZ */}
      <section className="relative bg-[#170d4d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold">As dimensões da <strong>Voz</strong></h2>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StaggerList step={70} y={14}>
              {[
                {
                  icon: Sparkles,
                  title: 'Voz que sente',
                  desc: 'Mapeamento das emoções despertadas — empatia, rejeição, entusiasmo e nuances.',
                },
                {
                  icon: MessageSquare,
                  title: 'Voz que pensa',
                  desc: 'Crenças, argumentos e racionalizações que sustentam opiniões e escolhas.',
                },
                {
                  icon: Target,
                  title: 'Voz que decide',
                  desc: 'Gatilhos que levam à ação — voto, compra, engajamento e preferência.',
                },
                {
                  icon: LayoutGrid,
                  title: 'Voz que muda',
                  desc: 'Transformações de opinião ao longo das sessões ou entre diferentes perfis.',
                },
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

      {/* FERRAMENTAS & ENTREGAS */}
      <section className="relative bg-[#170d4d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold">Ferramentas & entregas</h2>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <StaggerList step={80} y={14}>
              {[
                {
                  icon: LayoutGrid,
                  title: 'Painel comparativo de insights',
                  desc: 'Compare grupos por perfis e identifique padrões e diferenças relevantes.',
                },
                {
                  icon: Filter,
                  title: 'Mapas temáticos interativos',
                  desc: 'Visualização clara de tópicos emergentes, frequência de palavras e temas-chave.',
                },
                {
                  icon: BarChart3,
                  title: 'Gráficos de notas e votos',
                  desc: 'Acompanhamento da avaliação de ideias, produtos ou personalidades ao longo da dinâmica.',
                },
                {
                  icon: Quote,
                  title: 'Trechos expressivos',
                  desc: 'Citações-chave destacadas com contexto e interpretação para ação.',
                },
                {
                  icon: Target,
                  title: 'Dashboard de prioridade',
                  desc: 'Quais temas têm maior relevância e impacto percebido pelos participantes.',
                },
                {
                  icon: FileText,
                  title: 'Relatório executivo + recomendações',
                  desc: 'Síntese prática e visual com sugestões de ação imediata baseadas nos achados.',
                },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-center">Voz Ativa</h2>
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
                    Grupos de 6–8 participantes por sessão, perfis segmentados sob demanda, entrega ágil
                    e painéis de comparação por recorte.
                  </p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  {[
                    'Recrutamento por anúncios digitais + triagem completa (screener)',
                    'Moderação especializada e roteiro customizado',
                    'Sessões gravadas + transcrições',
                    'Codificação temática detalhada',
                    'Dashboard interativo de insights',
                    'Trechos destacados e recomendações de ação',
                    'Quantidade de grupos sob demanda',
                    'Suporte e Q&A incluídos',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#3b25a1]" />
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
