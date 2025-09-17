// app/contato/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare, MapPin } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/ux/Reveal';
import StaggerList from '@/components/ux/StaggerList';
import ContactForm from '@/components/forms/ContactForm';
import WhatsAppButton from "@/components/ux/WhatsAppButton";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contato — DADODADO',
    description: 'Fale com a DADODADO: agende uma demo, tire dúvidas e conheça nossas soluções.',
    alternates: { canonical: 'https://seu-dominio.com/contato' },
    openGraph: {
        type: 'website',
        url: 'https://seu-dominio.com/contato',
        siteName: 'DADODADO',
        title: 'Contato — DADODADO',
        description: 'Fale com a DADODADO: agende uma demo, tire dúvidas e conheça nossas soluções.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contato — DADODADO',
        description: 'Fale com a DADODADO: agende uma demo, tire dúvidas e conheça nossas soluções.',
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

export default function ContatoPage() {
    return (
        <main className="min-h-screen bg-[#170d4d] text-[#d9d9d9]">
            <Nav />

            {/* HERO */}
            <section className="relative overflow-hidden bg-black">
                <Image src="/bghero.png" alt="" fill priority className="absolute inset-0 object-cover opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

                <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
                    <Reveal>
                        <p className="uppercase tracking-widest text-xs sm:text-sm text-[#38d4b0]">fale com a gente</p>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Vamos transformar dados em decisão
                        </h1>
                    </Reveal>
                    <Reveal delay={180}>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
                            Tire dúvidas, peça um orçamento ou solicite uma demonstração gratuita.
                        </p>
                    </Reveal>
                </div>
            </section>

            <Divider from="#000000" to="#170d4d" />

            {/* CONTEÚDO */}
            <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Formulário */}
                    <div className="lg:col-span-7">
                        <Reveal>
                            <h2 className="text-2xl sm:text-3xl font-bold">Envie sua mensagem</h2>
                        </Reveal>
                        <Reveal delay={80}>
                            <p className="mt-2 text-[#d9d9d9]/85">
                                Responderemos em até 1 dia útil. Se preferir, use os canais rápidos ao lado.
                            </p>
                        </Reveal>

                        <ContactForm />
                    </div>

                    {/* Canais rápidos / Info */}
                    <div className="lg:col-span-5">
                        <div className="grid grid-cols-1 gap-5 sm:gap-6">
                            <StaggerList step={90} y={16}>
                                <div className="rounded-2xl p-5 bg-white/5 border border-[#38d4b0]/20 backdrop-blur">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-[#38d4b0]" />
                                        <h3 className="text-lg font-semibold">E-mail</h3>
                                    </div>
                                    <p className="mt-2">
                                        <a className="text-[#38d4b0] hover:underline" href="mailto:contato@dadodado.com.br">
                                            contato@dadodado.com.br
                                        </a>
                                    </p>
                                </div>

                                <div className="rounded-2xl p-5 bg-white/5 border border-[#38d4b0]/20 backdrop-blur flex flex-row justify-between">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare className="h-5 w-5 text-[#38d4b0]" />
                                        <h3 className="text-lg font-semibold">WhatsApp</h3>
                                    </div>
                                        {/* Botão flutuante de WhatsApp */}
                                        <WhatsAppButton
                                            phone="5521967675033"
                                            message="Olá! Vim pelo site da DadoDado e gostaria de mais informações."
                                            position="br"
                                        />
                                </div>

                                <div className="rounded-2xl p-5 bg-white/5 border border-[#38d4b0]/20 backdrop-blur">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-[#38d4b0]" />
                                        <h3 className="text-lg font-semibold">Endereço</h3>
                                    </div>
                                    <p className="mt-2 text-[#d9d9d9]/85">
                                        São Paulo — SP <br className="hidden sm:block" />
                                        (atendimento híbrido / remoto)
                                    </p>
                                </div>
                            </StaggerList>
                        </div>

                        {/* FAQ curto */}
                        <div className="mt-8">
                            <Reveal>
                                <h3 className="text-xl font-semibold">Perguntas frequentes</h3>
                            </Reveal>
                            <div className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
                                {[
                                    {
                                        q: 'A demo é realmente gratuita?',
                                        a: 'Sim. Inclui 1 relatório ou recorte gratuito definido no agendamento, sem compromisso.',
                                    },
                                    {
                                        q: 'Vocês atendem empresas e campanhas?',
                                        a: 'Sim. Trabalhamos com marcas, governos, campanhas, institutos, agências, influencers e personalidades.',
                                    },
                                    {
                                        q: 'Quais prazos típicos?',
                                        a: 'Onboarding em dias; leituras e relatórios conforme cadência combinada (semanal, quinzenal ou mensal).',
                                    },
                                ].map((item, i) => (
                                    <details key={i} className="group p-4">
                                        <summary className="cursor-pointer list-none font-medium">
                                            {item.q}
                                            <span className="ml-2 text-[#38d4b0]">+</span>
                                        </summary>
                                        <p className="mt-2 text-[#d9d9d9]/85">{item.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
