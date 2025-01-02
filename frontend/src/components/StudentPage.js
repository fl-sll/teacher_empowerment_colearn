import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/StudentPage.css";
// import slotData from "./data";
import SlackButton from "./SlackButton";
import Chip from "./Chip";
import SideBar from "./SideBar";
// import Header from "./Header";
import Button from "./Button";
import slider from "../assets/sliders-solid.svg";
import Table from "./Table";
import Popup from "./Popup";
import DownloadButton from "./DownloadButton";

function StudentPage({ student, props }) {
  // const id = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([1, 2, 3]);

  const categories = [
    {
      id: 1,
      title: "Avg.Attendance",
      sub: "Slot average attendance",
      number: 78.1,
      change: 12.1,
    },
    {
      id: 2,
      title: "Avg.Score",
      sub: "Average test score",
      number: 85.3,
      change: -3.5,
    },
    {
      id: 3,
      title: "Participation",
      sub: "Class participation rate",
      number: 65.0,
      change: 5.0,
    },
    {
      id: 4,
      title: "Homework Completion",
      sub: "Completed assignments",
      number: 90.4,
      change: 1.8,
    },
    {
      id: 5,
      title: "Engagement",
      sub: "Student engagement level",
      number: 72.2,
      change: -2.0,
    },
  ];

  const sample = [
    {
      id: 1,
      name: "Algebra",
      stickiness: "medium",
      percentageStickiness: "72%",
      attendanceRate: "85%",
      avgTimeSpent: "50 mins",
      attendance30: "65%",
      attendanceCount: 14,
      correctness: "78%",
      improvement: "Medium",
    },
    {
      id: 2,
      name: "Geometry",
      stickiness: "high",
      percentageStickiness: "91%",
      attendanceRate: "96%",
      avgTimeSpent: "63 mins",
      attendance30: "90%",
      attendanceCount: 20,
      correctness: "89%",
      improvement: "Very High",
    },
    {
      id: 3,
      name: "Trigonometry",
      stickiness: "low",
      percentageStickiness: "61%",
      attendanceRate: "78%",
      avgTimeSpent: "42 mins",
      attendance30: "55%",
      attendanceCount: 9,
      correctness: "66%",
      improvement: "Low",
    },
    {
      id: 4,
      name: "Calculus",
      stickiness: "high",
      percentageStickiness: "83%",
      attendanceRate: "90%",
      avgTimeSpent: "57 mins",
      attendance30: "80%",
      attendanceCount: 17,
      correctness: "85%",
      improvement: "High",
    },
  ];

  const handleSendData = (selectedRows) => {
    alert(`Sending data: ${JSON.stringify(selectedRows)}`);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSelectCategories = (categories) => {
    setSelectedCategories(categories);
  };

  const { studentId } = useParams();

  return (
    <div className="Main">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main">
        {/* <div className="header">
          <p>{courses}</p>
          <Header
            onCourseChange={handleCourseChange}
            onSlotChange={handleSlotChange}
          />
        </div> */}
        {/* Only show the table if both course and slot are selected */}
        {/* {selectedCourse && selectedSlot ? ( */}
          <>
            <div className="chips">
              {categories
                .filter((category) => selectedCategories.includes(category.id))
                .map((category) => (
                  <Chip
                    key={category.id}
                    metric={category}
                    isVisible={selectedCategories.includes(category.id)}
                  />
                ))}
              <div className="customize">
                <Button
                  label={"Customize"}
                  logo={slider}
                  border={"customize"}
                  action={handleOpenPopup}
                />
                <Popup
                  isOpen={isPopupOpen}
                  onClose={handleClosePopup}
                  categories={selectedCategories}
                  onSelectCategories={handleSelectCategories}
                />
                {/* <SlackButton
                  selectedRows={selectedRows}
                  onSendData={handleSendData}
                  selectedCourse={selectedCourse} // Pass selected course
                  selectedSlot={selectedSlot} // Pass selected slot
                /> */}
                <DownloadButton data={sample}/>
              </div>
            </div>
            <div className="table_view">
                <Table
                  type="students"
                  data={sample}
                />  
            </div>
          </>
        {/* ) : (
          <p>Please select a course and a slot to view the data.</p>
        )} */}
      </div>
    </div>
  );
}

export default StudentPage;
