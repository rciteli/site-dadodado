// app/(dashboard)/dashboard/layout.tsx
'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0C0F1A] text-[#d9d9d9]">
      {/* fundo com glows, consistente com o site */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0F1A] via-[#0F1322] to-[#0C0F1A]" />
        <div className="absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full bg-[#38d4b0]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[36rem] w-[36rem] rounded-full bg-[#3b25a1]/20 blur-3xl" />
      </div>

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 bg-black/40 backdrop-blur-xl">
          <Sidebar />
        </aside>

        <div className="flex min-h-screen flex-col">
          <Topbar />
          <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
