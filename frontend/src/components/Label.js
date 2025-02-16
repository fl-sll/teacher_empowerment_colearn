/**
 * @file Label.js
 * @description Component file for rendering a label chip in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2025-01-05
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the Label component which displays a text label with dynamic styling based on the text content.
 */

import "../styles/Chip.css";

function Label({ text }) {
  return <div className={`label_chip ${text.toLowerCase()}`}>{text}</div>;
}

export default Label;
