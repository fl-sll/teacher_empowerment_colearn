// import React from "react";
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
        <Route path="/student/:studentId" element={<StudentPage />} />
        <Route path="/session/:sessionId" element={<SessionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
