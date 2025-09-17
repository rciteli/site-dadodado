// components/sections/OurResponse.tsx
import { Share2 } from "lucide-react";
import Image from "next/image";
import SectionGradient from "../dividers/SectionGradient";

export default function OurResponse() {
    return (
        <section className="relative bg-[#D9D9D9]">
            {/* (Opcional) textura leve:
      <div className="absolute inset-0 bg-[url('/bgs/pattern.svg')] bg-no-repeat bg-right-top opacity-10" />
      */}

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid items-start gap-10 lg:grid-cols-12">
                    {/* Coluna ilustração/diagrama */}
                    <div className="lg:col-span-6">
                        <div className="relative overflow-hidden rounded-2xl">

                            {/* Placeholder do diagrama */}
                            <div className="rounded-xl grid place-items-center">
                                <Image
                                    src="/graph.jpg"
                                    alt=""
                                    width={400}
                                    height={400}
                                    className="object-contain rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Coluna título */}
                    <div className="lg:col-span-6 text-left ">
                        {/* Título com “trilho” lateral */}
                        <div className="">
                            <h2 className="text-4xl font-bold text-[#3b25a1]">
                                Nossa Resposta:
                                <br />
                                <span className="text-[#3b25a1]">
                                    Dados + Estratégia<br></br> em um só lugar
                                </span>
                            </h2>
                        </div>

                        <p className="mt-6 text-[22px] leading-relaxed text-[#3b25a1]">
                            Unimos <strong className="text-[#3b25a1]">dados e estratégia</strong> em um ecossistema integrado.
                            <br></br>
                            Mais do que social listening.
                            <br></br>
                            Mais do que pesquisa tradicional.
                            <br></br>
                            Entregamos uma{" "}
                            <strong className="text-[#3b25a1]">visão integrada da influência
                                digital, da opinião pública, do sentimento online e das narrativas</strong> que moldam o debate.
                        </p>
                    </div>
                </div>
            </div>
            <SectionGradient from="#D9D9D9" to="#170d4d" height={2} variant="linear" />
        </section>
    );
}
