// components/dashboard/Topbar.tsx
'use client';

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 text-sm">
        </div>

        <div className="flex items-center gap-3">
          <input
            placeholder="Buscar tópicos, usuários, termos…"
            className="w-56 rounded-md bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 placeholder:text-[#d9d9d9]/60 focus:outline-none focus:ring-[#38d4b0]/40"
          />
          <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm">JD</div>
        </div>
      </div>
    </header>
  );
}
