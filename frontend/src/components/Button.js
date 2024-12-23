import React from "react";
import "../styles/Button.css";

function Button({label, action, logo, border}) {
    const buttonClass = border === "customize" ? "custom_button custom" : "custom_button";
  return (
    <button onClick={action} className={buttonClass}>
    {logo && <img src={logo} alt="Button Logo" className="logo"/>}
    {label}
  </button>
  );
}

export default Button;
