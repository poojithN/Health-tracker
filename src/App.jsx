import { useState, useEffect } from "react";
import HealthForm from "./components/HealthForm";
import RecentStats from "./components/RecentStats";
import WeeklyChart from "./components/WeeklyChart";
import OverallChart from "./components/OverallChart";
import "./App.css";

const STORAGE_KEY = "healthAndFitness"; // exact key required

// Turns "YYYY-MM-DD" into a timestamp for midnight (local time) of that day
function dayStart(dateStr) {
  const [y, m, d] = String(dateStr).slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d).getTime();
}

function App() {
  // 1. Records: load from localStorage when the app first starts
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add"); // "add" or "edit"
  const [selectedRecord, setSelectedRecord] = useState(null);

  // 3. Save to localStorage every time records change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  // ---------- Modal helpers ----------
  const openAddForm = () => {
    setMode("add");
    setSelectedRecord(null);
    setIsModalOpen(true);
  };

  const openEditForm = (record) => {
    setMode("edit");
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  // ---------- Add / Edit / Delete ----------
  const handleSubmit = (formData) => {
    if (mode === "add") {
      const newRecord = { id: Date.now(), ...formData };
      setRecords([...records, newRecord]);
    } else {
      // map(): replace only the record being edited
      const updated = records.map((r) =>
        r.id === selectedRecord.id ? { ...r, ...formData } : r
      );
      setRecords(updated);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    // filter(): keep everything except the deleted one
    setRecords(records.filter((r) => r.id !== id));
  };

  // ---------- Derived data ----------
  // Newest date first
  const sortedRecords = [...records].sort(
    (a, b) => dayStart(b.date) - dayStart(a.date)
  );


    // Last 7 calendar days: today and the 6 days before it
  const now = new Date();
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).getTime();
  // Allow up to tomorrow, so UTC vs local date differences can't hide today's record
  const weekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();

  const weeklyRecords = sortedRecords.filter((r) => {
    const t = dayStart(r.date);
    return t >= weekStart && t <= weekEnd;
  });

  // Make sure the chart always receives real numbers
  const chartData = weeklyRecords.map((r) => ({
    ...r,
    date: String(r.date).slice(0, 10),
    calorieIntake: Number(r.calorieIntake),
    calorieBurned: Number(r.calorieBurned),
  }));

  return (
    <div className="app">
      <h1>Health And Fitness Tracker</h1>

      <section className="top-panel">
        <div className="add-card">
          {/* Hidden while the modal is open so the text isn't on the page twice */}
          {!isModalOpen && <h2>{"Update Today's Data"}</h2>}
          <button className="add-btn" onClick={openAddForm}>
            + Add data
          </button>
        </div>

        {/* Bar chart is hidden until at least one record exists */}
        {chartData.length > 0 && <WeeklyChart data={chartData} />}
      </section>

      <section className="bottom-panel">
        <RecentStats
          records={sortedRecords}
          onEdit={openEditForm}
          onDelete={handleDelete}
        />
        {/* Pie chart is always visible */}
        <OverallChart records={records} />
      </section>

      {isModalOpen && (
        <HealthForm
          mode={mode}
          record={selectedRecord}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}

export default App;