import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/bugs";

export default function ViewAllBugReports() {
    const [bugReports, setBugReports] = useState([]); // Initialize as an array

    useEffect(() => {
        async function fetchBugReports() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Uh ohhh, Stinky! Can't fetch bug reports uwu ${response.status}`);
                }
                const result = await response.json();
                setBugReports(result); // Assuming API returns an array
            } catch (err) {
                console.error("Uh ohhhh, stinky!", err);
            }
        }

        fetchBugReports();
    }, []); // Run only once on mount

    return (
        <div className="content-card">
            <div className="feature-grid">
                {bugReports.map((bugReport) => (
                    <div className="feature-card" key={bugReport.id}>
                        <h3>Report ID: {bugReport.issue_id}</h3>
                        <p>Report Details: {bugReport.issue}</p>
                        <p>
                            Reported by {bugReport.username} on {bugReport.date}. It is currently {bugReport.status}.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
