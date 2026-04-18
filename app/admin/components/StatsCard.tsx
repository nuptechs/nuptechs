export function StatsCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className={`admin-stat-card ${accent ? "accent" : ""}`}>
      <span className="admin-stat-value">{value.toLocaleString("pt-BR")}</span>
      <span className="admin-stat-label">{label}</span>
    </div>
  );
}
