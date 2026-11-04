import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 40000 },
  { month: "Feb", revenue: 65000 },
  { month: "Mar", revenue: 58000 },
  { month: "Apr", revenue: 90000 },
  { month: "May", revenue: 85000 },
  { month: "Jun", revenue: 120000 },
];

function RevenueChart() {
  return (
    <section className="analytics-card">
      <div className="analytics-header">
        <h2>Revenue Overview</h2>
        <p>Your agency revenue over time</p>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value: number) => `₹${value / 1000}K`} />
            <Tooltip
              formatter={(value) => [
                `₹${Number(value ?? 0).toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#7c3aed"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default RevenueChart;
