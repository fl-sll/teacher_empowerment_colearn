import React, { useState } from "react";
import logo from "../logo.svg";
import "../styles/Main.css";
import SlackButton from "./SlackButton";
import Chip from "./Chip";
import SideBar from "./SideBar";
import Header from "./Header";
import Button from "./Button";
import slider from "../assets/sliders-solid.svg";
import Table from "./Table";
import Popup from "./Popup";

function Main() {
  const [activeTable, setActiveTable] = useState("students");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([1, 2, 3]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); // Course selected state
  const [selectedSlot, setSelectedSlot] = useState(""); // Slot selected state
  const [selectedStudent, setSelectedStudent] = useState(null); // For storing selected student data
  const [selectedSession, setSelectedSession] = useState(null); // For storing selected session data

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

  // Dummy data for each slot
  const slotData = {
    "Matematika Merdeka 5": {
      students: [
        {
          id: 831038,
          name: "John Doe",
          stickiness: "high",
          percentageStickiness: "85%",
          attendanceRate: "90%",
          avgTimeSpent: "45 mins",
          attendance30: "70%",
          attendanceCount: 10,
          correctness: "80%",
          improvement: "High",
        },
        {
          id: 831039,
          name: "Jane Smith",
          stickiness: "medium",
          percentageStickiness: "75%",
          attendanceRate: "88%",
          avgTimeSpent: "40 mins",
          attendance30: "60%",
          attendanceCount: 8,
          correctness: "70%",
          improvement: "Medium",
        },
        {
          id: 831040,
          name: "Sam Brown",
          stickiness: "low",
          percentageStickiness: "65%",
          attendanceRate: "80%",
          avgTimeSpent: "35 mins",
          attendance30: "50%",
          attendanceCount: 7,
          correctness: "60%",
          improvement: "Low",
        },
        {
          id: 831041,
          name: "Audy",
          stickiness: "high",
          percentageStickiness: "90%",
          attendanceRate: "95%",
          avgTimeSpent: "50 mins",
          attendance30: "80%",
          attendanceCount: 12,
          correctness: "85%",
          improvement: "Very High",
        },
        {
          id: 831042,
          name: "Charlie White",
          stickiness: "medium",
          percentageStickiness: "78%",
          attendanceRate: "85%",
          avgTimeSpent: "42 mins",
          attendance30: "65%",
          attendanceCount: 9,
          correctness: "72%",
          improvement: "Medium",
        },
      ],
      sessions: [
        {
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
      ],
    },
    "Matematika Merdeka 6": {
      students: [
        {
          id: 831043,
          name: "Lucy Green",
          stickiness: "high",
          percentageStickiness: "88%",
          attendanceRate: "92%",
          avgTimeSpent: "48 mins",
          attendance30: "75%",
          attendanceCount: 11,
          correctness: "83%",
          improvement: "High",
        },
        {
          id: 831044,
          name: "Tom Black",
          stickiness: "medium",
          percentageStickiness: "80%",
          attendanceRate: "87%",
          avgTimeSpent: "43 mins",
          attendance30: "60%",
          attendanceCount: 8,
          correctness: "74%",
          improvement: "Medium",
        },
        {
          id: 831045,
          name: "Olivia Gray",
          stickiness: "low",
          percentageStickiness: "68%",
          attendanceRate: "77%",
          avgTimeSpent: "36 mins",
          attendance30: "55%",
          attendanceCount: 6,
          correctness: "62%",
          improvement: "Low",
        },
        {
          id: 831046,
          name: "Liam Brown",
          stickiness: "high",
          percentageStickiness: "90%",
          attendanceRate: "94%",
          avgTimeSpent: "50 mins",
          attendance30: "80%",
          attendanceCount: 12,
          correctness: "85%",
          improvement: "Very High",
        },
        {
          id: 831047,
          name: "Ella Blue",
          stickiness: "medium",
          percentageStickiness: "76%",
          attendanceRate: "82%",
          avgTimeSpent: "39 mins",
          attendance30: "58%",
          attendanceCount: 7,
          correctness: "70%",
          improvement: "Medium",
        },
      ],
      sessions: [
        {
          name: "Algebra",
          stickiness: "high",
          percentageStickiness: "90%",
          attendanceRate: "95%",
          avgTimeSpent: "55 mins",
          attendance30: "80%",
          attendanceCount: 15,
          correctness: "87%",
          improvement: "Very High",
        },
        {
          name: "Geometry",
          stickiness: "medium",
          percentageStickiness: "75%",
          attendanceRate: "88%",
          avgTimeSpent: "47 mins",
          attendance30: "70%",
          attendanceCount: 12,
          correctness: "80%",
          improvement: "Medium",
        },
        {
          name: "Trigonometry",
          stickiness: "low",
          percentageStickiness: "65%",
          attendanceRate: "80%",
          avgTimeSpent: "40 mins",
          attendance30: "60%",
          attendanceCount: 10,
          correctness: "72%",
          improvement: "Low",
        },
        {
          name: "Calculus",
          stickiness: "high",
          percentageStickiness: "88%",
          attendanceRate: "92%",
          avgTimeSpent: "60 mins",
          attendance30: "85%",
          attendanceCount: 18,
          correctness: "90%",
          improvement: "High",
        },
      ],
    },
  };

  const showStudentsTable = () => setActiveTable("students");
  const showSessionsTable = () => setActiveTable("sessions");

  const handleSelectedRowsChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };

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

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setSelectedRows([]); // Clear selected rows when course changes
  };

  const handleSlotChange = (slot) => {
    setSelectedSlot(slot);
    setSelectedRows([]); // Clear selected rows when slot changes
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setSelectedSession(null); // Clear session selection if student is clicked
  };

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setSelectedStudent(null); // Clear student selection if session is clicked
  };

  const data = selectedSlot ? slotData[selectedSlot] : {};

  return (
    <div className="Main">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main">
        <div className="header">
          <Header
            onCourseChange={handleCourseChange}
            onSlotChange={handleSlotChange}
          />
        </div>
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
            <SlackButton
              selectedRows={selectedRows}
              onSendData={handleSendData}
              selectedCourse={selectedCourse} // Pass selected course
              selectedSlot={selectedSlot} // Pass selected slot
            />
          </div>
        </div>
        <div className="button_details">
          <Button label={"Students"} action={showStudentsTable} />
          <Button label={"Sessions"} action={showSessionsTable} />
        </div>

        {/* Only show the table if both course and slot are selected */}
        {selectedCourse && selectedSlot ? (
          <div className="table_view">
            {activeTable === "students" && (
              <Table
                type="students"
                data={data.students} // Pass relevant slot data
                onSelectedRowsChange={handleSelectedRowsChange}
                onRowClick={handleStudentClick} // Pass onClick handler for rows
              />
            )}
            {activeTable === "sessions" && (
              <Table
                type="sessions"
                data={data.sessions} // Pass relevant slot data
                onSelectedRowsChange={handleSelectedRowsChange}
                onRowClick={handleSessionClick} // Pass onClick handler for rows
              />
            )}
          </div>
        ) : (
          <p>Please select a course and a slot to view the data.</p>
        )}
      </div>
    </div>
  );
}

export default Main;
