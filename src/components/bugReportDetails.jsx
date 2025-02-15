import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/bugs";

export default function BugReportDetails() {
  const { issue_id } = useParams(); // Get issue_id from the URL
  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  // Fetch bug details based on issue_id
  useEffect(() => {
    async function fetchBugDetails() {
      try {
        const response = await fetch(`${API_URL}/${issue_id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch bug details: ${response.status}`);
        }
        const data = await response.json();
        setBug(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBugDetails();
  }, [issue_id]); // Re-fetch when issue_id changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!bug) return <p>Bug report not found.</p>;

  return (
    <div className="bug-details">
            <button onClick={() => navigate(-1)} className="cta-button">
        &larr; Back
      </button>
      <h1>Bug Report Details</h1>
      <p><strong>ID:</strong> {bug.issue_id}</p>
      <p><strong>Reported by:</strong> {bug.username}</p>
      <p><strong>Date:</strong> {bug.date}</p>
      <p><strong>Status:</strong> {bug.status}</p>
      <p><strong>Issue:</strong> {bug.issue}</p>
    </div>
  );
}