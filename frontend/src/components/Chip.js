import React from "react";
import "../styles/Chip.css";

function Chip({ title, sub, number, change }) {
  // Determine the class for chip_bottom dynamically
  const chipBottomClass = change > 0 ? "chip_bottom increase" : "chip_bottom decrease";
  const sign = change > 0 ? "+" : "";

  return (
    <div>
      <div className="chip_base">
        <div className="chip_top">
          <div className="chip_text">
            <p className="chip_title">{title}</p>
            <p className="chip_sub">{sub}</p>
          </div>
          <div className="chip_percentage">
            <p className="chip_number">{number}</p>
          </div>
        </div>
        <div className={chipBottomClass}>
          <p><strong>{sign}{change}</strong> from previous session</p>
        </div>
      </div>
    </div>
  );
}

export default Chip;
