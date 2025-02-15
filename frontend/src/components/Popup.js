/**
 * @file Popup.js
 * @description Component file for rendering a popup in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2025-02-16
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the Popup component which allows users to select up to 3 metrics to display.
 * It includes functionality to handle checkbox changes and submit the selected metrics.
 */

import React, { useState, useEffect } from "react";
import "../styles/Popup.css";

const Popup = ({ isOpen, onClose, categories, onSelectCategories }) => {
  const [selectedCategories, setSelectedCategories] = useState(categories);

  useEffect(() => {
    setSelectedCategories(categories);
  }, [categories]);

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, categoryId];
      } else {
        return prevSelected;
      }
    });
  };

  const handleSubmit = () => {
    if (selectedCategories.length === 3) {
      onSelectCategories(selectedCategories);
      onClose();
    }
  };

  if (!isOpen) return null;

  const categoryList = [
    { id: 1, name: "Stickiness" },
    { id: 2, name: "Attendance" },
    { id: 3, name: "Time Spent" },
    { id: 4, name: "30 mins Attendance" },
    { id: 5, name: "Attendance Count" },
    { id: 6, name: "Correctness" },
    { id: 7, name: "Improvement" },
  ];

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Select 3 Metrics to Display</h2>
        <div className="categories-list">
          {categoryList.map((category) => (
            <div key={category.id} className="category-item">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
              />
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
            </div>
          ))}
        </div>
        <div className="popup-buttons">
          <button
            className="blue"
            onClick={handleSubmit}
            disabled={selectedCategories.length !== 3}
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
        {selectedCategories.length < 3 && (
          <p className="error-message">You must select exactly 3 metrics.</p>
        )}
      </div>
    </div>
  );
};

export default Popup;
