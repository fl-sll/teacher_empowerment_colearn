/**
 * @file Breadcrumbs.js
 * @description Component file for rendering breadcrumbs in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2025-02-16
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the Breadcrumbs component which displays the navigation path and engagement title.
 * It fetches course and slot data from the backend and displays the current date.
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import axios from "axios";
import { backend_link } from "./CONST";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Breadcrumbs({ type, name, courseId, slotId }) {
  const navigate = useNavigate();
  const [course, setCourse] = useState("");
  const [slot, setSlot] = useState("");

  const fetchData = async () => {
    try {
      const course_data = await axios.get(`${backend_link}courses/${courseId}`);
      const slot_data = await axios.get(
        `${backend_link}courses/${courseId}/classes/${slotId}`
      );
      // console.log(course_data);
      // console.log(course_data.data.courseName);
      setCourse(course_data.data.courseName);
      setSlot(slot_data.data.className);
    } catch (err) {
      // console.log("error: ", err);
      setCourse("Course error");
      setSlot("Slot error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Determine the header title based on the type prop
  const engagementTitle =
    type === "session" ? "Session Engagement" : "Student Engagement";

  return (
    <div className="header-container">
      <h2>{engagementTitle}</h2>
      <p>
        {course} <strong>/</strong> {slot} <strong>/</strong> {name}
      </p>
      <div className="back">
        <div
          className="arrow-container"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
          role="button"
          aria-label="Back"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <h3>{name}</h3>
      </div>
      <p className="date">Last updated: {currentDate}</p>
      <hr />
    </div>
  );
}

export default Breadcrumbs;
