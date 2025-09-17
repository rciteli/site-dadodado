// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black text-[#d9d9d9]">
      {/* linha superior */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#38d4b0] via-[#3b25a1] to-[#38d4b0]" />

      {/* glows (reduzidos no mobile) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-16 -left-24 h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80 rounded-full blur-3xl opacity-25 sm:opacity-30"
          style={{ background: "radial-gradient(40% 40% at 50% 50%, rgba(56,212,176,0.25), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 right-[-4rem] h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80 rounded-full blur-3xl opacity-20 sm:opacity-25"
          style={{ background: "radial-gradient(40% 40% at 50% 50%, rgba(59,37,161,0.28), transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Top row */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Marca */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="DADODADO"
              width={120}
              height={40}
              className="h-6 w-auto sm:h-7 lg:h-8"
            />
          </div>

          {/* Links principais */}
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm">
            {[
              { href: "/sobre", label: "sobre" },
              { href: "/servicos", label: "serviços" },
              { href: "/blog", label: "blog" },
              { href: "/contato", label: "contato" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="lowercase text-[#d9d9d9]/80 hover:text-[#38d4b0] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="my-6 sm:my-8 h-px w-full bg-white/10" />

        {/* Bottom row */}
        <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm">
          <p className="text-[#d9d9d9]/70">© {year} DADODADO. todos os direitos reservados.</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/termos" className="lowercase text-[#d9d9d9]/70 hover:text-[#3b25a1] transition-colors">
              termos e privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
