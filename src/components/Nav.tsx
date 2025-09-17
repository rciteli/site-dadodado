'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/sobre', label: 'sobre' },
    { href: '/servicos', label: 'serviços' },
    { href: '/blog', label: 'blog' },
  ];

  return (
    <header
      className="
        sticky top-0 z-[80]
        bg-neutral-900/70 backdrop-blur-xl
        supports-[backdrop-filter]:bg-neutral-900/60
        shadow-[0_6px_24px_rgba(0,0,0,0.25)]
        border-b border-white/10
      "
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo DADODADO"
            width={180}
            height={40}
            className="h-auto w-[160px] sm:w-[180px] select-none"
          />
        </Link>

        {/* Botão Mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="primary-menu"
          className="
            lg:hidden inline-flex items-center justify-center rounded-xl px-3 py-2
            ring-1 ring-white/15 bg-white/5 backdrop-blur
            hover:bg-white/10 transition text-white
            focus:outline-none focus:ring-2 focus:ring-[#38d4b0]/60 focus:ring-offset-2 focus:ring-offset-neutral-900/0
          "
        >
          <span className="sr-only">Abrir menu</span>
          {/* Ícone hambúrguer / close */}
          <svg
            className={`h-6 w-6 ${open ? 'hidden' : 'block'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            className={`h-6 w-6 ${open ? 'block' : 'hidden'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        {/* Menu Desktop */}
        <ul className="hidden lg:flex items-center gap-10 text-[18px]">
          {links.map((l) => (
            <li key={l.href} className="group relative">
              <Link
                href={l.href}
                className="
                  inline-block lowercase
                  text-gray-200 hover:text-white transition-colors
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38d4b0]/60 rounded
                "
              >
                {l.label}
              </Link>
              {/* underline animado (acento da marca) */}
              <span
                aria-hidden
                className="
                  pointer-events-none absolute left-0 -bottom-1 h-0.5 w-0
                  bg-[#38d4b0] transition-all duration-300 ease-out group-hover:w-full
                "
              />
            </li>
          ))}
          <li>
            <Link
              href="/contato"
              className="
                inline-flex lowercase rounded-full px-6 py-2 font-medium
                bg-[#3b25a1] text-white
                shadow-[0_8px_22px_rgba(59,37,161,0.35)]
                hover:brightness-110 transition
                focus:outline-none focus:ring-2 focus:ring-[#38d4b0]/60 focus:ring-offset-2 focus:ring-offset-neutral-900/0
              "
            >
              contato
            </Link>
          </li>
        </ul>
      </nav>

      {/* Menu Mobile (dropdown) */}
      <div
        id="primary-menu"
        className={`lg:hidden transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid grid-rows-[1fr]' : 'grid grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <ul
            className="
              mx-4 mb-4 space-y-2 rounded-2xl p-4
              bg-neutral-900/85 backdrop-blur
              ring-1 ring-white/10
              text-gray-100
            "
          >
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="
                    block w-full rounded-xl px-3 py-2 lowercase
                    hover:bg-white/10 transition
                    focus:outline-none focus:ring-2 focus:ring-[#38d4b0]/60
                  "
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contato"
                onClick={() => setOpen(false)}
                className="
                  block w-full rounded-full px-4 py-2 text-center font-medium lowercase
                  bg-[#3b25a1] text-white hover:brightness-110 transition
                  focus:outline-none focus:ring-2 focus:ring-[#38d4b0]/60
                "
              >
                contato
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
