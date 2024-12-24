import React from "react";
import "../styles/StudentPage.css"; // You can add custom styles for the page

function StudentPage({ student, session,props }) {
    const id = props;
  // If the student is passed, display their detailed data
  if (student) {
    return (
      <div className="student-page">
        <h2>{student.name}</h2>
        <div className="student-details">
          <p><strong>Attendance Rate:</strong> {student.attendanceRate}</p>
          <p><strong>Avg. Time Spent:</strong> {student.avgTimeSpent}</p>
          <p><strong>Correctness:</strong> {student.correctness}</p>
          <p><strong>Improvement:</strong> {student.improvement}</p>
          <p><strong>Stickiness:</strong> {student.stickiness}</p>
          <p><strong>Attendance in Last 30 Days:</strong> {student.attendance30}</p>
          <p><strong>Completed Assignments:</strong> {student.attendanceCount}</p>
        </div>
      </div>
    );
  }

  // If the session is passed, display session details
  if (session) {
    return (
      <div className="session-page">
        <h2>{session.name}</h2>
        <div className="session-details">
          <p><strong>Attendance Rate:</strong> {session.attendanceRate}</p>
          <p><strong>Avg. Time Spent:</strong> {session.avgTimeSpent}</p>
          <p><strong>Correctness:</strong> {session.correctness}</p>
          <p><strong>Improvement:</strong> {session.improvement}</p>
          <p><strong>Stickiness:</strong> {session.stickiness}</p>
          <p><strong>Attendance in Last 30 Days:</strong> {session.attendance30}</p>
          <p><strong>Attendance Count:</strong> {session.attendanceCount}</p>
        </div>
      </div>
    );
  }

  return <p>No student or session data available.</p>;
}

export default StudentPage;
