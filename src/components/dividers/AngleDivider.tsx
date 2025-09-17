// components/dividers/AngleDivider.tsx
type Props = {
  color?: string;   // cor da seção de baixo
  height?: number;  // px de altura do corte
  flip?: boolean;   // inverte a direção
};
export default function AngleDivider({ color = "#000000", height = 72, flip }: Props) {
  return (
    <div aria-hidden className="relative w-full overflow-hidden" style={{ height }}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon
          points={flip ? "0,0 100,0 100,100" : "0,100 0,0 100,0"}
          fill={color}
        />
      </svg>
    </div>
  );
}
