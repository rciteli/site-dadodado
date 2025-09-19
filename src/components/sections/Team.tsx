// components/sections/Team.tsx
"use client";

import Image from "next/image";
import { User as UserIcon } from "lucide-react";
import Reveal from "@/components/ux/Reveal";
import StaggerList from "@/components/ux/StaggerList";

type Member = {
  name: string;
  role: string;
  photo?: string; // opcional
  bio: string;
};

const founders: Member[] = [
  {
    name: "João Nonato",
    role: "CEO e Diretor de Insights",
    // photo: "/team/joao.jpg",
    bio: "Cientista social com mais de uma década de experiência em opinião pública, social listening e comunicação baseada em dados, João Nonato lidera a DADODADO com foco em inovação, integração e inteligência aplicada à decisão.",
  },
  {
    name: "Rafael Nonato",
    role: "CTO e Diretor de Produto",
    // photo: "/team/rafael.jpg",
    bio: "Tech head com experiência em IA aplicada e produtos data-driven. Conduz a arquitetura da plataforma e o roadmap técnico, garantindo escalabilidade, qualidade dos modelos e uma experiência fluida do dado à ação.",
  },
];

const specialists: Member[] = [
  {
    name: "Ronald Azevedo",
    role: "Especialista em Marketing Digital & Growth",
    // photo: "/team/ronald.jpg",
    bio: "Responsável pelo marketing interno da DADODADO e PM do Pulso Público. Garante que a coleta de respostas via anúncios opere de forma eficiente e escalável, unindo performance e qualidade de amostra.",
  },
  {
    name: "Lucas Pires",
    role: "Especialista em IA & Automação",
    // photo: "/team/lucas.jpg",
    bio: "Desenvolve modelos e rotinas para coleta e análise automática em redes sociais. Evolui o Lupa Social com NLP (classificação de sentimentos, detecção de temas e entidades) para transformar ruído em insight acionável.",
  },
  {
    name: "Beatriz Sampaio",
    role: "Especialista em Estatística & Modelagem",
    // photo: "/team/beatriz.jpg",
    bio: "Lidera plano amostral e desenho de pesquisas do Pulso Público. Atua na ponderação e calibração pós-coleta (pós-estratificação, rake) e na modelagem de índices compostos como o Pêndulo Digital e novos produtos.",
  },
];

// util para iniciais (ex.: "João Nonato" -> "JN")
function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function PhotoOrPlaceholder({
  member,
  tall = false,
}: {
  member: Member;
  tall?: boolean;
}) {
  const heightClass = tall ? "h-44 sm:h-52" : "h-36 sm:h-40";

  if (member.photo) {
    return (
      <div
        className={`relative ${heightClass} w-full overflow-hidden rounded-xl ring-1 ring-[#38d4b0]/20`}
      >
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(min-width:1024px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  // placeholder com iniciais
  return (
    <div
      className={`relative ${heightClass} w-full overflow-hidden rounded-xl ring-1 ring-[#38d4b0]/20 grid place-items-center`}
      style={{
        background:
          "radial-gradient(60% 60% at 50% 40%, rgba(56,212,176,0.20), rgba(59,37,161,0.18))",
      }}
      aria-label={`${member.name} (sem foto)`}
    >
      <div className="flex items-center gap-2">
        <div className="grid place-items-center rounded-lg bg-black/30 backdrop-blur px-3 py-2">
          <span className="text-2xl sm:text-3xl font-bold text-[#d9d9d9] tracking-wide">
            {getInitials(member.name)}
          </span>
        </div>
        <UserIcon className="h-5 w-5 text-[#38d4b0]/80" aria-hidden />
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="relative bg-[#170d4d] text-[#d9d9d9]">
      <div className="flex items-center justify-center">
        <svg
          width="998"
          height="5"
          viewBox="0 0 998 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-0.000976563 2.98633C16.6324 3.11966 33.2658 3.24633 49.8991 3.36633C199.599 4.44633 349.3 4.98633 499 4.98633C648.7 4.98633 798.401 4.44633 948.101 3.36633C964.734 3.24633 981.368 3.11966 998.001 2.98633C981.368 2.85299 964.734 2.72633 948.101 2.60633C798.401 1.52633 648.7 0.986328 499 0.986328C349.3 0.986328 199.599 1.52633 49.8991 2.60633C33.2658 2.72633 16.6324 2.85299 -0.000976563 2.98633Z"
            fill="#3b25a1"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Cabeçalho */}
        <div className="text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Quem faz a <span className="text-[#38d4b0]">DADO</span>DADO
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-[#d9d9d9]/85">
              Um time que integra estratégia, engenharia e métodos para gerar clareza — do
              dado ao resultado.
            </p>
          </Reveal>
        </div>

        {/* Fundadores (maiores, alturas iguais) */}
        <div className="mt-10 sm:mt-12">
          <Reveal>
            <h3 className="text-xl sm:text-2xl font-semibold text-center text-[#d9d9d9]/95">
              Liderança
            </h3>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            <StaggerList step={100} y={20}>
              {founders.map((m) => (
                <article
                  key={m.name}
                  className="
                    flex flex-col h-full
                    group overflow-hidden rounded-2xl p-5 sm:p-6
                    bg-white/5 backdrop-blur
                    border border-[#38d4b0]/20
                    shadow-[0_10px_30px_rgba(0,0,0,0.20)]
                    transition-all duration-300 ease-out
                    hover:bg-white/10 hover:border-[#38d4b0]/35 hover:shadow-[0_18px_48px_rgba(0,0,0,0.35)]
                    min-h-[420px] sm:min-h-[460px]  /* <- altura mínima padronizada */
                  "
                >
                  <PhotoOrPlaceholder member={m} tall />
                  <div className="mt-4 flex flex-col flex-grow">
                    <h4 className="text-lg sm:text-xl font-semibold">{m.name}</h4>
                    <p className="text-sm sm:text-base text-[#38d4b0]">{m.role}</p>
                    <p className="mt-2 text-sm sm:text-base text-[#d9d9d9]/85 line-clamp-6 flex-grow">
                      {m.bio}
                    </p>
                    {/* espaçador opcional para equalizar com ícones/links futuros */}
                    <div aria-hidden className="mt-2" />
                  </div>
                </article>
              ))}
            </StaggerList>
          </div>
        </div>

        {/* Especialistas (menores, alturas iguais) */}
        <div className="mt-12 sm:mt-16">
          <Reveal>
            <h3 className="text-xl sm:text-2xl font-semibold text-center text-[#d9d9d9]/95">
              Especialistas
            </h3>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            <StaggerList step={90} y={20}>
              {specialists.map((m) => (
                <article
                  key={m.name}
                  className="
                    flex flex-col h-full
                    group overflow-hidden rounded-2xl p-5 sm:p-6
                    bg-white/5 backdrop-blur
                    border border-[#38d4b0]/20
                    shadow-[0_10px_30px_rgba(0,0,0,0.20)]
                    transition-all duration-300 ease-out
                    hover:bg-white/10 hover:border-[#38d4b0]/35 hover:shadow-[0_18px_48px_rgba(0,0,0,0.35)]
                    min-h-[300px] sm:min-h-[300px]  /* <- menor que liderança */
                  "
                >

                  <div className="mt-4 flex flex-col flex-grow">
                    <h4 className="text-lg font-semibold sm:text-xl">{m.name}</h4>
                    <p className="text-sm sm:text-base text-[#38d4b0]">{m.role}</p>
                    <p className="mt-2 text-sm sm:text-base text-[#d9d9d9]/85 line-clamp-5 flex-grow">
                      {m.bio}
                    </p>
                    <div aria-hidden className="mt-1" />
                  </div>
                </article>
              ))}
            </StaggerList>
          </div>
        </div>
      </div>
    </section>
  );
}
