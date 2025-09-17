// components/sections/TheChallenge.tsx
import { Activity } from "lucide-react";

export default function TheChallenge() {
  return (
    <section className="relative bg-[#D9D9D9]">
      {/* BG decorativo sutil (opcional) */}
      {/* <div className="absolute inset-0 bg-[url('/bgs/pattern.svg')] bg-no-repeat bg-right-top opacity-10" /> */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Coluna título */}
          <div className="lg:col-span-4">

            {/* Título com “trilho” lateral */}
            <div className="mt-4 flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1.5 h-10 w-1.5 rounded-full"
              />
              <h2 className="text-4xl font-bold text-[#3b25a1]">
                O Desafio:{" "}
                <br></br>
                <span className="text-[#3b25a1]">Decidir no ritmo<br></br> das redes</span>
              </h2>
            </div>


          </div>

          {/* Coluna texto */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden">
              {/* faixa superior fina com gradiente da marca */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1" />
              <p className="text-[22px] leading-relaxed text-[#3b25a1]">
                Em um mundo onde <strong className="text-[#3b25a1]">mensagens circulam em segundos</strong> e a{" "}
                <strong className="text-[#3b25a1]">opinião pública muda a cada instante</strong>,
                políticos, influenciadores e marcas não podem esperar semanas para agir.
                É preciso medir impacto e tomar decisões{" "}
                <strong className="text-[#3b25a1]">no ritmo da conversa digital</strong>.
              </p>

              {/* sublinha animada ao passar o mouse no bloco (detalhe sutil) */}
              <span
                aria-hidden
                className="mt-5 block h-px w-0 bg-gradient-to-r from-[#3b25a1] to-[#38d4b0] transition-all duration-500 ease-out hover:w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <svg width="998" height="5" viewBox="0 0 998 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-0.000976563 2.98633C16.6324 3.11966 33.2658 3.24633 49.8991 3.36633C199.599 4.44633 349.3 4.98633 499 4.98633C648.7 4.98633 798.401 4.44633 948.101 3.36633C964.734 3.24633 981.368 3.11966 998.001 2.98633C981.368 2.85299 964.734 2.72633 948.101 2.60633C798.401 1.52633 648.7 0.986328 499 0.986328C349.3 0.986328 199.599 1.52633 49.8991 2.60633C33.2658 2.72633 16.6324 2.85299 -0.000976563 2.98633Z" fill="#3b25a1" />
        </svg>
      </div>
    </section>
  );
}
