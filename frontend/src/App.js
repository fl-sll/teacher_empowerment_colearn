/**
 * @file App.js
 * @description Main application file for the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2025-01-12
 * authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file sets up the main application routes using React Router, including routes for the main dashboard, student page, and session page.
 */

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import StudentPage from "./components/StudentPage";
import SessionPage from "./components/SessionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/student/:courseId/:slotId/:studentId" element={<StudentPage />} />
        <Route path="/session/:courseId/:slotId/:sessionId" element={<SessionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
