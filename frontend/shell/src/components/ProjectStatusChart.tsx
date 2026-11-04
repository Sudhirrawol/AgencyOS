import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const projectData = [
  { name: "Active", value: 7, color: "#10b981" },
  { name: "In Progress", value: 3, color: "#3b82f6" },
  { name: "On Hold", value: 2, color: "#f59e0b" },
];

const totalProjects = projectData.reduce(
  (total, item) => total + item.value,
  0,
);

function ProjectStatusChart() {
  return (
    <section className="analytics-card">
      <div className="analytics-header">
        <h2>Projects by Status</h2>
        <p>Current project distribution</p>
      </div>

      <div className="donut-layout">
        <div className="donut-chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={3}
              >
                {projectData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="donut-center">
            <strong>{totalProjects}</strong>
            <span>Projects</span>
          </div>
        </div>

        <div className="donut-legend">
          {projectData.map((item) => (
            <div className="legend-item" key={item.name}>
              <span
                className="legend-dot"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectStatusChart;
