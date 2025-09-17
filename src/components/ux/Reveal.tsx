// components/ux/Reveal.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

type RevealProps = {
  children: React.ReactNode;
  /** atraso em ms para o item (p/ stagger manual) */
  delay?: number;
  /** deslocamento inicial em px (eixo Y positivo = sobe) */
  y?: number;
  /** limiar de interseção (0..1) */
  threshold?: number;
  /** anima só na primeira vez que entra na viewport */
  once?: boolean;
  /** classe extra */
  className?: string;
};

const REVEAL_SESSION_FLAG = 'dd_reveal_seen';

export default function Reveal({
  children,
  delay = 0,
  y = 16,
  threshold = 0.15,
  once = true,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Desativa animações se o usuário já visitou a página nessa sessão
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // respeita reduce motion
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const alreadySeen = sessionStorage.getItem(REVEAL_SESSION_FLAG) === '1';
    setDisabled(prefersReduced || alreadySeen);
  }, []);

  useEffect(() => {
    if (!ref.current || disabled) {
      // se desativado, mostra direto
      setVisible(true);
      return;
    }
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(el);
            // marca como visto na sessão (para próximas visitas não animarem)
            sessionStorage.setItem(REVEAL_SESSION_FLAG, '1');
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once, disabled]);

  // estilos inline para delay e deslocamento
  const style: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
    transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
    opacity: visible ? 1 : 0,
  };

  return (
    <div
      ref={ref}
      style={style}
      className={[
        // transições suaves (Tailwind)
        'transition-all duration-700 ease-out will-change-transform',
        // se animação desativada, mantém layout sem “pulo”
        disabled ? 'opacity-100 translate-y-0' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
