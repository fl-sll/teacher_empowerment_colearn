/**
 * @file DownloadButton.js
 * @description Component file for rendering a download button in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2025-01-22
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the DownloadButton component which allows users to download data in CSV or XLSX format.
 * It includes functionality to flatten nested objects and convert JSON data to CSV or XLSX files.
 */

import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import axios from "axios";
import { backend_link } from "./CONST";

function Header({ onCourseChange, onSlotChange }) {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [slotOptions, setSlotOptions] = useState([]);
  const [error, setError] = useState(null); // New state for errors

  const fetchCoursesData = async () => {
    try {
      const course_data = await axios.get(`${backend_link}courses/`);
      const data = course_data.data.map((item) => ({
        courseName: item.courseName,
        courseId: item.courseId,
      }));
      setCourseOptions(data);
      setError(null); // Reset error if data is fetched successfully
    } catch (err) {
      // console.log("Error fetching courses:", err);
      setError("Error fetching courses");
      setCourseOptions([]); // Reset course options if error occurs
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
      setSlotOptions(data);
      setError(null); // Reset error if data is fetched successfully
    } catch (err) {
      // console.log("Error fetching slots:", err);
      setError("Error fetching slots");
      setSlotOptions([]); // Reset slot options if error occurs
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, []); // Fetch courses on mount

  useEffect(() => {
    if (selectedCourse) {
      fetchSlotData();
    } else {
      setSlotOptions([]); // Clear slot options if no course is selected
    }
  }, [selectedCourse]); // Fetch slots when selectedCourse changes

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    onCourseChange(e.target.value);
  };

  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
    onSlotChange(e.target.value);
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
            {courseOptions.length > 0 ? (
              courseOptions.map((course, index) => (
                <option key={index} value={course.courseId}>
                  {course.courseName}
                </option>
              ))
            ) : (
              <option disabled>{error || "No courses available"}</option>
            )}
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
            {slotOptions.length > 0 ? (
              slotOptions.map((slot, index) => (
                <option key={index} value={slot.slotId}>
                  {slot.slotName}
                </option>
              ))
            ) : (
              <option disabled>{error || "No slots available"}</option>
            )}
          </select>
        </div>
      </div>

      <hr />
    </div>
  );
}

export default Header;
