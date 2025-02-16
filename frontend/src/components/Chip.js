/**
 * @file Button.js
 * @description Component file for rendering a customizable button in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2025-01-05
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the Button component which can display a label, an optional logo, and handle click actions.
 * It supports a customizable border style.
 */


import React from "react";
import "../styles/Chip.css";

function Chip({ metric, isVisible }) {
  // const chipBottomClass = metric.change > 0 ? "chip_bottom increase" : "chip_bottom decrease";
  // const sign = metric.change > 0 ? "+" : "";
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (!isVisible) return null;

  return (
    <div>
      <div className="chip_base">
        <div className="chip_top">
          <div className="chip_text">
            <p className="chip_title">{metric.title}</p>
            <p className="chip_data">Updated: {currentDate}</p>
          </div>
          <div className="chip_percentage">
            <p className="chip_number">{metric.number}</p>
          </div>
        </div>
        <div className="chip_bottom">
          {/* <p><strong>{sign}{metric.change}</strong> from previous session</p> */}
          <p className="chip_sub">{metric.sub}</p>
        </div>
      </div>
    </div>
  );
}

export default Chip;
