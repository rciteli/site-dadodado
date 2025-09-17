// components/dividers/SectionFade.tsx
type Props = {
  from?: string; // cor do topo (seção acima)
  to?: string;   // cor do fundo (seção abaixo)
  height?: number; // px
  radial?: boolean; // usa fade radial se true
};
export default function SectionFade({
  from = "#170d4d",
  to = "#000000",
  height = 120,
  radial = false,
}: Props) {
  return (
    <div
      aria-hidden
      style={{
        height,
        background: radial
          ? `radial-gradient(120% 100% at 50% 0%, ${from} 0%, ${to} 70%)`
          : `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
      }}
    />
  );
}
