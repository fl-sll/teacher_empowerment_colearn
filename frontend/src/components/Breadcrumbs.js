import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Breadcrumbs({ type, name }) {
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Determine the header title based on the type prop
  const engagementTitle = type === "session" ? "Session Engagement" : "Student Engagement";

  return (
    <div className="header-container">
      <h2>{engagementTitle}</h2>
      <div className="back">
        <div
          className="arrow-container"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
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
