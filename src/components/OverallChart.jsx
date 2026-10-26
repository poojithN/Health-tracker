import { PieChart, Pie, Cell, Legend } from "recharts";

function OverallChart({ records }) {
  // Add up all intake and all burned calories
  const totalIntake = records.reduce((sum, r) => sum + Number(r.calorieIntake), 0);
  const totalBurned = records.reduce((sum, r) => sum + Number(r.calorieBurned), 0);

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
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label={renderLabel}
          labelLine={false}
          stroke="#fff"
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}

export default OverallChart;