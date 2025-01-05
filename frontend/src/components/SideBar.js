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
