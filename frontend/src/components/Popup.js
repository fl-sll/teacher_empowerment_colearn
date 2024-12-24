// Popup.js
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
    { id: 1, name: "Avg.Attendance" },
    { id: 2, name: "Avg.Score" },
    { id: 3, name: "Participation" },
    { id: 4, name: "Homework Completion" },
    { id: 5, name: "Engagement" },
  ];

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Select 3 Categories to Display</h2>
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
            onClick={handleSubmit}
            disabled={selectedCategories.length !== 3}
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
        {selectedCategories.length < 3 && (
          <p className="error-message">You must select exactly 3 categories.</p>
        )}
      </div>
    </div>
  );
};

export default Popup;
