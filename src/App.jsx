import React, { useEffect, useState } from "react";

const BugDetails = ({ bugId }) => {
  const [bug, setBug] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bug details
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/bugs/1707409001`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBug(data); // Set the bug details
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [bugId]);

  // Fetch comments for the bug
  useEffect(() => {
    if (bug) {
      fetch(`http://127.0.0.1:5000/api/comments/${bug.issue_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setComments(data); // Set the comments
          setLoading(false); // Set loading to false
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [bug]);

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display the bug and its comments
  return (
    <div>
      {bug && (
        <div>
          <h1>Bug Details</h1>
          <p>{bug.id}</p>
          <p>{bug.issue}</p>
          <p>Reported by: {bug.username} on: {bug.date}</p>
          <p>Status: {bug.status}</p>
        </div>
      )}

      <h2>Comments</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>{comment.id}: posted by {comment.username} @ Date: {comment.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments found for this bug.</p>
      )}
    </div>
  );
};

export default BugDetails;