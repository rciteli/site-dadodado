// app/blog/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/ux/Reveal';
import StaggerList from '@/components/ux/StaggerList';
import { posts } from '@/content/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — DADODADO',
  description:
    'Insights sobre influência, opinião, sentimento e narrativas — exemplos práticos e guias para decisão.',
  keywords: [
    'DADODADO',
    'influência digital',
    'opinião pública',
    'análise de sentimento',
    'narrativas',
    'social listening',
    'pesquisa online',
  ],
  alternates: {
    canonical: 'https://seu-dominio.com/blog',
  },
  openGraph: {
    type: 'website',
    url: 'https://seu-dominio.com/blog',
    siteName: 'DADODADO',
    title: 'Blog — DADODADO',
    description:
      'Insights sobre influência, opinião, sentimento e narrativas — exemplos práticos e guias para decisão.',
    images: [
      {
        url: 'https://seu-dominio.com/og/blog.jpg', // crie uma imagem OG opcional
        width: 1200,
        height: 630,
        alt: 'Blog da DADODADO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — DADODADO',
    description:
      'Insights sobre influência, opinião, sentimento e narrativas — exemplos práticos e guias para decisão.',
    images: ['https://seu-dominio.com/og/blog.jpg'],
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

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#170d4d] text-[#d9d9d9]">
      <Nav />
      {/* Fundo com glows suaves */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0F1A] via-[#0F1322] to-[#0C0F1A]" />
        <div className="absolute -top-20 -left-20 h-[36rem] w-[36rem] rounded-full bg-[#00C0FF]/15 blur-3xl" />
        {/* em vez de translate, use offset negativo e deixe o wrapper cortar */}
        <div className="absolute -bottom-32 -right-[12%] h-[40rem] w-[40rem] rounded-full bg-[#00005A]/30 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-black">
        <Image src="/bghero.png" alt="" fill priority className="absolute inset-0 object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <Reveal>
            <p className="uppercase tracking-widest text-xs sm:text-sm text-[#38d4b0]">conteúdo</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight"><strong>DADO</strong>Blog</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
              Insights sobre influência, opinião, sentimento e narrativas — com exemplos e práticas para decisão.
            </p>
          </Reveal>
        </div>
      </section>

      <Divider from="#000000" to="#170d4d" />

      {/* LISTAGEM */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Últimos artigos</h2>
          <p className="mt-2 text-[#d9d9d9]/80">Curadoria de métodos, produto e casos de uso.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <StaggerList step={90} y={20}>
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-4 sm:p-5 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_18px_48px_rgba(0,0,0,0.35)]"
              >
                {/* capa */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-white/10">
                  <Image
                    src={post.cover || `/blog/covers/${post.slug}.jpg`}
                    alt={post.coverAlt || post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* texto */}
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wide text-[#38d4b0]">{post.keyword}</p>
                  <h3 className="mt-1 text-lg sm:text-xl font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm text-[#d9d9d9]/85 line-clamp-3">{post.summary}</p>
                </div>

                {/* footer do card */}
                <div className="mt-4 flex items-center justify-between text-xs text-[#d9d9d9]/70">
                  <span>{new Date(post.updatedAt || Date.now()).toLocaleDateString('pt-BR')}</span>
                  <Link href={`/blog/${post.slug}`} className="text-[#38d4b0] hover:text-[#38d4b0]/90">
                    ler mais →
                  </Link>
                </div>
              </article>
            ))}
          </StaggerList>
        </div>
      </section>

      <Footer />
    </main>
  );
}