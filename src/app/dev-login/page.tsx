'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export default function DevLogin() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (session) {
    return (
      <div className="p-6 space-y-4 text-white">
        <div>Logado como <b>{session.user?.email}</b></div>
        <button className="px-3 py-2 bg-white/10 rounded" onClick={() => signOut()}>Sair</button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-3 text-white">
      <input className="px-3 py-2 bg-white/10 rounded block" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="px-3 py-2 bg-white/10 rounded block" placeholder="nome (opcional)" value={name} onChange={e=>setName(e.target.value)} />
      <button
        className="px-3 py-2 bg-[#3b25a1] rounded text-white"
        onClick={() => signIn('credentials', { email, name, callbackUrl: '/dashboard' })}
      >
        Entrar (dev)
      </button>
    </div>
  );
}
