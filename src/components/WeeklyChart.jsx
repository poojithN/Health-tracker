import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip,
} from "recharts";

// Pick a chart width based on the screen size
function getChartWidth() {
  const w = window.innerWidth;
  if (w > 900) return Math.max(Math.round((w - 216) * 0.66), 320);
  return Math.max(w - 100, 280);
}

function WeeklyChart({ data }) {
  const [width, setWidth] = useState(getChartWidth());

  // Update the width when the window is resized
  useEffect(() => {
    const onResize = () => setWidth(getChartWidth());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="weekly">
      <h2 className="chart-title">Weekly Health Trends</h2>
      <BarChart width={width} height={320} data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
        {/* interval={0} makes sure EVERY date label is drawn */}
        <XAxis dataKey="date" interval={0} tick={{ fill: "#000" }} />
        <YAxis tick={{ fill: "#000" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="calorieIntake" fill="#8884d8" isAnimationActive={false} />
        <Bar dataKey="calorieBurned" fill="#82ca9d" isAnimationActive={false} />
      </BarChart>
    </div>
  );
}

export default WeeklyChart;