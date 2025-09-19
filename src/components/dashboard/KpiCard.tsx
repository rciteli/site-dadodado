// components/dashboard/KpiCard.tsx
export default function KpiCard({
  label, value, delta,
}: { label: string; value: string; delta?: string }) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur p-4 ring-1 ring-white/10">
      <p className="text-xs uppercase tracking-wide text-[#38d4b0]">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-semibold">{value}</span>
        {delta && <span className="text-xs text-[#d9d9d9]/70">{delta}</span>}
      </div>
    </div>
  );
}
