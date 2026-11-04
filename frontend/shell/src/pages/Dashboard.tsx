import { Users, FolderKanban, ListTodo, Wallet } from "lucide-react";

import KpiCard from "../components/KpiCard";
import RevenueChart from "../components/RevenueChart";
import ProjectStatusChart from "../components/ProjectStatusChart";
import "../components/Analytics.css";

const dashboardStats = [
  {
    title: "Total Clients",
    value: "24",
    change: "+20%",
    icon: Users,
    variant: "purple",
  },
  {
    title: "Active Projects",
    value: "12",
    change: "+33%",
    icon: FolderKanban,
    variant: "blue",
  },
  {
    title: "Open Tasks",
    value: "38",
    change: "-12%",
    icon: ListTodo,
    variant: "green",
  },
  {
    title: "Revenue",
    value: "₹1.20L",
    change: "+18%",
    icon: Wallet,
    variant: "orange",
  },
] as const;

function Dashboard() {
  return (
    <main className="dashboard-page">
      {/* Dashboard heading */}
      <div className="dashboard-heading">
        <h1>Dashboard Overview</h1>
        <p>Here's what's happening with your agency today.</p>
      </div>

      {/* KPI cards */}
      <section className="dashboard-stats" aria-label="Agency statistics">
        {dashboardStats.map((stat) => (
          <KpiCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="analytics-grid" aria-label="Agency analytics">
        <RevenueChart />
        <ProjectStatusChart />
      </section>
    </main>
  );
}

export default Dashboard;
