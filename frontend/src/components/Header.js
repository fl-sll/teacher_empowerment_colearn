import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import axios from "axios";
import { backend_link } from "./CONST";

function Header({ onCourseChange, onSlotChange }) {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [slotOptions, setSlotOptions] = useState([]);

  const fetchCoursesData = async () => {
    try {
      const course_data = await axios.get(`${backend_link}courses/`);
      const data = course_data.data.map((item) => ({
        courseName: item.courseName,
        courseId: item.courseId,
      }));
      console.log(data);
      setCourseOptions(data);
    } catch (err) {
      console.log("Error fetching courses:", err);
      setCourseOptions(["Error"]);
    }
  };

  const fetchSlotData = async () => {
    try {
      const slot_data = await axios.get(
        `${backend_link}courses/${selectedCourse}/classes/`
      );
      const data = slot_data.data.map((item) => ({
        slotName: item.className,
        slotId: item.classId,
      }));
      console.log(data);
      setSlotOptions(data);
    } catch (err) {
      console.log("Error fetching slots:", err);
      setSlotOptions(["Error"]);
    }
  };

  // Fetch courses on mount
  useEffect(() => {
    fetchCoursesData();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Fetch slots when selectedCourse changes
  useEffect(() => {
    if (selectedCourse) {
      fetchSlotData();
    } else {
      setSlotOptions([]); // Clear slot options if no course is selected
    }
  }, [selectedCourse]); // Dependency on selectedCourse

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    onCourseChange(e.target.value); // Call the parent's callback
  };

  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
    onSlotChange(e.target.value); // Call the parent's callback
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
            className="dropdown_header"
          >
            <option value="">Select a course</option>
            {courseOptions.map((course, index) => (
              <option key={index} value={course.courseId}>
                {course.courseName}
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
            className="dropdown_header"
            disabled={!selectedCourse} // Disable dropdown until a course is selected
          >
            <option value="">Select a slot</option>
            {slotOptions.map((slot, index) => (
              <option key={index} value={slot.slotId}>
                {slot.slotName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr />
    </div>
  );
}

export default Header;
