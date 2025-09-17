// components/forms/ContactForm.tsx
'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import React from 'react';

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1 block text-sm font-medium">
        {label} {required && <span className="text-[#38d4b0]">*</span>}
      </span>
      {children}
    </label>
  );
}

export default function ContactForm() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot
    if ((data.get('companyWebsite') as string)?.trim()) return;

    const payload = {
      name: data.get('name')?.toString().trim(),
      email: data.get('email')?.toString().trim(),
      company: data.get('company')?.toString().trim(),
      subject: data.get('subject')?.toString().trim(),
      message: data.get('message')?.toString().trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      alert('Preencha nome, e-mail e mensagem.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
      alert('Digite um e-mail válido.');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Falha ao enviar');

      form.reset();
      alert('Mensagem enviada! Em breve entraremos em contato.');
    } catch (err) {
      console.error(err);
      alert('Não foi possível enviar agora. Tente novamente mais tarde.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:gap-5">
      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nome" htmlFor="name" required>
          <input
            id="name"
            name="name"
            placeholder="Seu nome"
            required
            className="w-full rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 placeholder:text-[#d9d9d9]/60 focus:outline-none focus:ring-2 focus:ring-[#38d4b0]/60"
          />
        </Field>

        <Field label="E-mail" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            className="w-full rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 placeholder:text-[#d9d9d9]/60 focus:outline-none focus:ring-2 focus:ring-[#38d4b0]/60"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Empresa" htmlFor="company">
          <input
            id="company"
            name="company"
            placeholder="Opcional"
            className="w-full rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 placeholder:text-[#d9d9d9]/60 focus:outline-none focus:ring-2 focus:ring-[#38d4b0]/60"
          />
        </Field>

        <Field label="Assunto" htmlFor="subject">
          <input
            id="subject"
            name="subject"
            placeholder="Ex.: Solicitar proposta"
            className="w-full rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 placeholder:text-[#d9d9d9]/60 focus:outline-none focus:ring-2 focus:ring-[#38d4b0]/60"
          />
        </Field>
      </div>

      <Field label="Mensagem" htmlFor="message" required>
        <textarea
          id="message"
          name="message"
          placeholder="Conte rapidamente seu contexto e objetivo"
          rows={6}
          required
          className="w-full rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 placeholder:text-[#d9d9d9]/60 focus:outline-none focus:ring-2 focus:ring-[#38d4b0]/60"
        />
      </Field>

      <div className="mt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold bg-[#3b25a1] text-white shadow-[0_10px_30px_rgba(59,37,161,0.35)] hover:brightness-110 transition"
        >
          Enviar mensagem <ArrowRight size={18} />
        </button>
      </div>

      <p className="mt-3 flex items-center gap-2 text-xs text-[#d9d9d9]/70">
        <CheckCircle2 className="h-4 w-4 text-[#38d4b0]" />
        Seus dados ficam seguros e não serão compartilhados com terceiros.
      </p>
    </form>
  );
}
