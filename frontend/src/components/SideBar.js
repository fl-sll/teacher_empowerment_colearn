/**
 * @file SideBar.js
 * @description Component file for rendering the sidebar in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2025-01-05
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the SideBar component which includes navigation links and the application logo.
 */

import React from "react";
import "../styles/SideBar.css";
import colearn from "../assets/colearn_logo.png";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="sidebar-container">
      {/* <button>Engagement</button> */}
      {/* <button>test</button> */}
      {/* <img src={sidebar} alt="sidebar" className="cropped-image" /> */}
      <Link to={`/`}>
        <img src={colearn} alt="colearn logo" className="colearn_logo"/>
      </Link>
      Engagement Dashboard
    </div>
  );
}

export default SideBar;
