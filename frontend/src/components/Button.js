/**
 * @file Button.js
 * @description Component file for rendering a customizable button in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2024-12-23
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the Button component which can display a label, an optional logo, and handle click actions.
 * It supports a customizable border style.
 */

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
