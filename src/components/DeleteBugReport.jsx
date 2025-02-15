import React from "react";

const API_URL = `http://localhost:5000/api/bugs`;

const DeleteBugReport = ({ issue_id, onRemove }) => {
  const removeBug = async () => {
    if (!window.confirm("Are you sure you want to delete this bug report?")) {
      return;
    }
    try {
      console.log("Deleting bug with issue_id:", issue_id);
      const response = await fetch(`${API_URL}/${issue_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the bug report.");
      }

      if (onRemove) onRemove(issue_id);
    } catch (err) {
      console.error("Error deleting bug report:", err);
      alert("An error occurred while deleting the bug report. Please try again.");
    }
  };

  return (
    <button onClick={removeBug} className="remove-btn">
      Remove
    </button>
  );
};

export { DeleteBugReport };