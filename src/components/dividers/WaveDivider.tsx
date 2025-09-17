// components/dividers/WaveDivider.tsx
type Props = {
  color?: string;    // cor da seção de baixo
  height?: number;   // px
  amplitude?: number;// “altura” da onda (0-100 relativo ao viewBox)
};
export default function WaveDivider({ color = "#170d4d", height = 120, amplitude = 12 }: Props) {
  const a = Math.max(4, Math.min(28, amplitude));
  return (
    <div aria-hidden className="relative w-full overflow-hidden" style={{ height }}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          d={`M0,${a} C360,${a*2} 1080,0 1440,${a} L1440,100 L0,100 Z`}
          fill={color}
        />
      </svg>
    </div>
  );
}
