import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeeklyChart({ data }) {
  return (
    <div className="weekly">
      <h2 className="chart-title">Weekly Health Trends</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
           <XAxis dataKey="date" tick={{ fill: "#000" }} />   {/* changed */}
  <YAxis tick={{ fill: "#000" }} /> 
          <Tooltip />
          <Legend />
          <Bar dataKey="calorieIntake" fill="#8884d8" />
          <Bar dataKey="calorieBurned" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyChart;