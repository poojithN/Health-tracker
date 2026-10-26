import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

function OverallChart({ records }) {
  // Add up all intake and all burned calories
  const totalIntake = records.reduce((sum, r) => sum + r.calorieIntake, 0);
  const totalBurned = records.reduce((sum, r) => sum + r.calorieBurned, 0);

  const data = [
    { name: "Intake", value: totalIntake },
    { name: "Burned", value: totalBurned },
  ];
  const COLORS = ["#a100ff", "#ff9100"];

  // Show "57%" labels inside the slices
  const renderLabel = ({ percent }) => `${Math.round(percent * 100)}%`;

  return (
    <div className="overall">
      <h2 className="section-title">Overall Data</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={renderLabel}
            labelLine={false}
            stroke="#fff"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OverallChart;