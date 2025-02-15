import React, { useEffect, useState } from "react";
import { DeleteBugReport } from "./DeleteBugReport";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/bugs";

export default function ViewAllBugReports({ refresh }) {
  const [bugReports, setBugReports] = useState([]);

  // Fetch bug reports on component mount and when refresh prop changes
  useEffect(() => {
    async function fetchBugReports() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(
            `Uh ohhh, Stinky! Can't fetch bug reports uwu ${response.status}`
          );
        }
        const result = await response.json();
        setBugReports(result);
      } catch (err) {
        console.error("Uh ohhhh, stinky!", err);
      }
    }

    fetchBugReports();
  }, [refresh]); // Re-fetch when refresh prop changes

  // Function to handle bug removal
  const handleRemoveBug = (issue_id) => {
    setBugReports(bugReports.filter(p => p.issue_id !== issue_id));
  };

  return (
    <div className="content-card">
      <div className="bug-report-list">
        {bugReports.map((bugReport) => (
          <div className="bug-report-card" key={bugReport.id}>
            <Link to={`/bugs/${bugReport.id}`} className="bug-report-link"> 
              <h3>ID: {bugReport.issue_id}</h3>
              <div className="bug-report-content">
                Reported by {bugReport.username} on {bugReport.date}. It is
                currently <p className="bug-report-status">{bugReport.status}.</p>
              </div>
            </Link>
            <DeleteBugReport
              issue_id={bugReport.issue_id}
              onRemove={() => handleRemoveBug(bugReport.issue_id)}
              className="remove-btn"
            />
          </div>
        ))}
      </div>
    </div>
  );
}