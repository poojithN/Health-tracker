import { MdOutlineCancel, MdEdit } from "react-icons/md";

function RecentStats({ records, onEdit, onDelete }) {
  return (
    <div className="recent">
      <h2 className="section-title">Recent Health Statistics</h2>
      <ul className="stats-list">
        {records.map((r) => (
          <li key={r.id} className="stat-item">
            <div className="stat-info">
              <p className="stat-desc">{r.description}</p>
              <p className="stat-numbers">
                Calories Intake = {r.calorieIntake}&nbsp;&nbsp;
                Calories Burned = {r.calorieBurned}
              </p>
            </div>
            <div className="stat-actions">
              <span className="stat-date">{r.date}</span>
              <button
                className="icon-btn delete"
                onClick={() => onDelete(r.id)}
              >
                <MdOutlineCancel size={24} />
              </button>
              <button className="icon-btn edit" onClick={() => onEdit(r)}>
                <MdEdit size={22} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentStats;