import React from "react";
import "../styles/SideBar.css";
import sidebar from "../assets/sidebar.png"

function SideBar() {
  return (
    <div className="image-container">
        {/* <button>Engagement</button> */}
        {/* <button>test</button> */}
        <img src={sidebar} alt="sidebar" className="cropped-image" />
    </div>
  );
}

export default SideBar;
