import React from "react";
import "../styles/Header.css";
import top from "../assets/top.png"

function Header() {
  return (
    <div className="header-image-container">
        {/* <button>Engagement</button> */}
        {/* <button>test</button> */}
        <img src={top} alt="header" className="header-image" />
    </div>
  );
}

export default Header;
