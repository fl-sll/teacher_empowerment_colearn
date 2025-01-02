import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { backend_link } from "./CONST";

function Main() {
  const [activeTable, setActiveTable] = useState("students");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([1, 2, 3]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); // Course selected state
  const [selectedSlot, setSelectedSlot] = useState(""); // Slot selected state
  const [selectedStudent, setSelectedStudent] = useState(null); // For storing selected student data
  const [selectedSession, setSelectedSession] = useState(null); // For storing selected session data
  const [tableData, setTableData] = useState([]);

  const fetchCoursesData = async () => {
    try {
      const course_data = await axios.get(`${backend_link}courses/`);
      console.log(`${backend_link}courses/`);
      console.log(course_data.data);
      const data = course_data.data.map((item) => item.courseName);
      setTableData(data);
      // setCourses(course_data.data);
    } catch (err) {
      console.log("error: ", err);
      setTableData(["Error"]);
    }
  };

  // useEffect(()=>{
  //   fetchCoursesData();
  // })

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
    setSelectedRows([]);
  };

  const handleSlotChange = (slot) => {
    setSelectedSlot(slot);
    console.log("slot: ", selectedSlot);
    setSelectedRows([]);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setSelectedSession(null);
  };

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setSelectedStudent(null);
  };

  // const data = selectedSlot ? slotData[selectedSlot] : {};
  return (
    <div className="Main">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main">
        <div className="header">
          {/* <p>{courses}</p> */}
          <Header
            onCourseChange={handleCourseChange}
            onSlotChange={handleSlotChange}
          />
          <p>{selectedSlot}</p>
        </div>
        {/* Only show the table if both course and slot are selected */}
        {selectedCourse && selectedSlot ? (
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
            {/* <div className="table_view">
              {activeTable === "students" && (
                <Table
                  type="students"
                  data={tableData}
                  onSelectedRowsChange={handleSelectedRowsChange}
                  onRowClick={handleStudentClick}
                />
              )}
              {activeTable === "sessions" && (
                <Table
                  type="sessions"
                  data={tableData}
                  onSelectedRowsChange={handleSelectedRowsChange}
                  onRowClick={handleSessionClick}
                />
              )}
            </div> */}
          </>
        ) : (
          <p>Please select a course and a slot to view the data.</p>
        )}
      </div>
    </div>
  );
}

export default Main;
