import { useState } from "react";

function HealthForm({ mode, record, onSubmit, onCancel }) {
  // Pre-fill when editing, empty when adding
  const [date, setDate] = useState(record ? record.date : "");
  const [intake, setIntake] = useState(record ? record.calorieIntake : "");
  const [burned, setBurned] = useState(record ? record.calorieBurned : "");
  const [description, setDescription] = useState(
    record ? record.description : ""
  );
  const [error, setError] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!date || intake === "" || burned === "" || !description.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (Number(intake) < 0 || Number(burned) < 0) {
      setError("Calories cannot be negative.");
      return;
    }

    onSubmit({
      date,
      calorieIntake: Number(intake),
      calorieBurned: Number(burned),
      description: description.trim(),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>
  {mode === "edit" ? "Let's see what you want to change!" : "Update Today's Data"}
</h2>

        <form onSubmit={handleFormSubmit}>
          <div className="form-row">
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label htmlFor="intake">Calorie Intake</label>
            <input
              id="intake"
              type="number"
              placeholder="Enter Today's Calorie Intake"
              value={intake}
              onChange={(e) => setIntake(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label htmlFor="burned">Calorie Burned</label>
            <input
              id="burned"
              type="number"
              placeholder="Enter Today's Calorie Burned"
              value={burned}
              onChange={(e) => setBurned(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label htmlFor="desc">Short Description:</label>
            <input
              id="desc"
              type="text"
              placeholder="Enter a short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default HealthForm;