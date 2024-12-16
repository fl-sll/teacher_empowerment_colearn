import React from "react";
import "../styles/Chip.css";
function Chip({ title, sub, number, change }) {
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
        <div className="chip_bottom">
          <p>{change} from previous sesssion</p>
        </div>
      </div>
    </div>
  );
}

export default Chip;
