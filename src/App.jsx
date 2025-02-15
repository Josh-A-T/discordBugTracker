import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "./components/Modal";
import BugReportDetails from "./components/BugReportDetails";
import ViewAllBugReports from "./components/viewAllBugReports";
import NewBugReport from "./components/newBugReport";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshBugReports, setRefreshBugReports] = useState(false);

  // Function to handle new bug addition
  const handleBugAdded = () => {
    setIsModalOpen(false); // Close the modal
    setRefreshBugReports((prev) => !prev); // Toggle refresh state to trigger re-fetch
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="details-btn">
        New Bug Report
      </button>

      {/* Modal for adding a new bug report */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NewBugReport onBugAdded={handleBugAdded} />
        </Modal>
      )}

      {/* View all bug reports */}
      <Router>
      <Routes>
        <Route path="/" element={<ViewAllBugReports />} />
        <Route path="/bugs/:issue_id" element={<BugReportDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;