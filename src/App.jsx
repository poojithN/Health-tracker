import { useState, useEffect } from "react";
import HealthForm from "./components/HealthForm";
import RecentStats from "./components/RecentStats";
import WeeklyChart from "./components/WeeklyChart";
import OverallChart from "./components/OverallChart";
import "./App.css";

const STORAGE_KEY = "healthAndFitness"; // exact key required

// Turns a Date object into "YYYY-MM-DD" using LOCAL time
// (toISOString would use UTC and can shift the day)
function toDateString(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
  // Newest date first (YYYY-MM-DD strings sort correctly as text)
  const sortedRecords = [...records].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  // Last 7 CALENDAR days (today and the 6 days before), not last 7 records
  const today = new Date();
  const sixDaysAgo = new Date();
  sixDaysAgo.setDate(today.getDate() - 6);
  const todayStr = toDateString(today);
  const startStr = toDateString(sixDaysAgo);

  const weeklyRecords = sortedRecords.filter(
    (r) => r.date >= startStr && r.date <= todayStr
  );

  // 👇 add this line here (temporary, for debugging)
  console.log("range:", startStr, "to", todayStr, "| weekly:", weeklyRecords);

  return (
    <div className="app">
      <h1>Health And Fitness Tracker</h1>

      <section className="top-panel">
        <div className="add-card">
          {!isModalOpen && <h2>{"Update Today's Data"}</h2>}
          <button className="add-btn" onClick={openAddForm}>
            + Add data
          </button>
        </div>

        {/* Bar chart hidden until at least one record exists */}
        {records.length > 0 && <WeeklyChart data={weeklyRecords} />}
      </section>

      <section className="bottom-panel">
        <RecentStats
          records={sortedRecords}
          onEdit={openEditForm}
          onDelete={handleDelete}
        />
        {/* Pie chart always visible */}
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