import type { LucideIcon } from "lucide-react";
import "./KpiCard.css";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  variant: "purple" | "blue" | "green" | "orange";
}

function KpiCard({ title, value, change, icon: Icon, variant }: KpiCardProps) {
  return (
    <article className={`kpi-card kpi-${variant}`}>
      <div className="kpi-top">
        <span>{title}</span>
        <Icon size={26} aria-hidden="true" />
      </div>

      <h2>{value}</h2>

      <p className="kpi-change">{change} vs last month</p>
    </article>
  );
}

export default KpiCard;
