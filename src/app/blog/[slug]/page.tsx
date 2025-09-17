// app/blog/[slug]/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/ux/Reveal';
import { posts } from '@/content/posts';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-[#170d4d] text-[#d9d9d9]">
      <Nav />

      {/* HERO do post */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image src={post.cover} alt={post.coverAlt || post.title} fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
        </div>
        <div className="relative z-[1] mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-20 text-center">
          <Reveal>
            <p className="uppercase tracking-widest text-xs sm:text-sm text-[#38d4b0]">{post.keyword}</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{post.title}</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-4 text-sm sm:text-base text-[#d9d9d9]/85">
              {new Date(post.updatedAt || Date.now()).toLocaleDateString('pt-BR')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {post.sections.map((sec, idx) => (
          <article key={sec.heading} className="mt-8 first:mt-0">
            <Reveal delay={idx * 90}>
              <h2 className="text-2xl sm:text-3xl font-semibold">{sec.heading}</h2>
            </Reveal>
            {sec.paragraphs.map((p, i) => (
              <Reveal key={i} delay={idx * 90 + 50}>
                <p className="mt-3 text-[#d9d9d9]/85 leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </article>
        ))}

        {post.cta && (
          <div className="mt-10">
            <Link
              href={post.cta.href}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold bg-[#3b25a1] text-white shadow-[0_10px_30px_rgba(59,37,161,0.35)] hover:brightness-110 transition"
            >
              {post.cta.label}
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
