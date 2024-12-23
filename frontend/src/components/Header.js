import React, { useState } from "react";
import "../styles/Header.css";

function Header() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const courseOptions = ["Matematika Merdeka - Kelas 4 SMT 2"];
  const slotOptions = ["Matematika Merdeka 5", "Matematika Merdeka 6"];

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
  };
  return (
    <div className="header-container">
      <h2>Engagement Dashboard</h2>
      <h3>Main page</h3>
      <div className="course-slot-selector">
        <div className="dropdown-container">
          <label htmlFor="course">Course: </label>
          <select
            id="course"
            value={selectedCourse}
            onChange={handleCourseChange}
            className="dropdown"
          >
            <option value="">Select a course</option>
            {courseOptions.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-container">
          <label htmlFor="slot">Slot: </label>
          <select
            id="slot"
            value={selectedSlot}
            onChange={handleSlotChange}
            className="dropdown"
          >
            <option value="">Select a slot</option>
            {slotOptions.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="selection-summary">
            <p>
              Selected Course: {selectedCourse || "None"} <br />
              Selected Slot: {selectedSlot || "None"}
            </p>
          </div> */}
      </div>
      <hr></hr>
    </div>
  );
}

export default Header;
