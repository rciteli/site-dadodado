// components/ux/StaggerList.tsx
'use client';

import Reveal from './Reveal';

type StaggerListProps = {
  children: React.ReactNode[];
  /** atraso base entre itens em ms */
  step?: number;
  /** deslocamento Y padrão */
  y?: number;
};

export default function StaggerList({ children, step = 80, y = 16 }: StaggerListProps) {
  return (
    <>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step} y={y}>
          {child}
        </Reveal>
      ))}
    </>
  );
}
