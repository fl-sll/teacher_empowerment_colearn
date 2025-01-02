import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import axios from "axios";
import { backend_link } from "./CONST";

function Header({ onCourseChange, onSlotChange }) {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [slotOptions, setSlotOptions] = useState([]);

  // const courseOptions = ["Matematika Merdeka - Kelas 4 SMT 2"];
  // const slotOptions = ["Matematika Merdeka 5", "Matematika Merdeka 6"];

  const fetchCoursesData = async () => {
    try {
      const course_data = await axios.get(`${backend_link}courses/`);
      // console.log(`${backend_link}courses/`)
      // console.log(course_data.data);
      const data = course_data.data.map((item) => ({
        courseName: item.courseName,
        courseId: item.courseId
      }));
      console.log(data);
      setCourseOptions(data);
      // setCourses(course_data.data);
    } catch (err) {
      console.log("error: ", err);
      setCourseOptions(["Error"])
    }
  };

  const fetchSlotData = async () => {
    try {
      // console.log(selectedCourse);
      const slot_data = await axios.get(`${backend_link}courses/${selectedCourse}/classes/`);
      const data = slot_data.data.map((item) => ({
        slotName: item.className,
        slotId: item.classId
      }));
      console.log(data);
      setSlotOptions(data);
      // setCourses(course_data.data);
    } catch (err) {
      console.log("error: ", err);
      setSlotOptions(["Error"])
    }
  };

  useEffect(()=>{
    fetchCoursesData();
    fetchSlotData();
  })

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
            className="dropdown"
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
            className="dropdown"
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
