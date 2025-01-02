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
  const [studentData, setStudentData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  const fetchCoursesData = async () => {
    try {
      // Fetch class details
      const classDataResponse = await axios.get(
        `${backend_link}courses/${selectedCourse}/classes/${selectedSlot}`
      );
      const classData = classDataResponse.data;
  
      // Fetch sessions associated with the class
      const sessionsResponse = await axios.get(
        `${backend_link}courses/${selectedCourse}/classes/${selectedSlot}/sessions`
      );
      const sessionIds = sessionsResponse.data.map((item) => item.sessionId);
  
      // Renew metrics for each session
      await Promise.all(
        sessionIds.map((sessionId) =>
          axios.put(`${backend_link}metrics/calculate/session/${sessionId}`)
        )
      );
  
      // Calculate metrics for the class
      await axios.put(
        `${backend_link}metrics/calculate/class/${selectedSlot}`
      );
  
      // Fetch metrics data for the class
      const classMetricsResponse = await axios.get(
        `${backend_link}metrics/${classData.metricsId}`
      );
      const classMetrics = classMetricsResponse.data;
  
      // Combine class data and metrics into the desired format
      // !! fix this
      const formattedData = {
        courseId: classData.courseId,
        courseName: classData.className,
        stickiness: formatStickiness(classMetrics.stickiness),
        percentageStickiness: `${(classMetrics.stickiness * 100).toFixed(0)}%`,
        attendanceRate: `${(
          (classMetrics.attendance / classMetrics.attendanceOver30Mins) *
          100
        ).toFixed(0)}%`,
        avgTimeSpent: `${classMetrics.avgTimeSpent.toFixed(0)} mins`,
        attendance30: `${(
          (classMetrics.attendanceOver30Mins / classMetrics.attendance) *
          100
        ).toFixed(0)}%`,
        attendanceCount: classMetrics.attendance,
        correctness: `${(classMetrics.correctness * 100).toFixed(0)}%`,
        improvement: formatImprovement(classMetrics.improvement),
      };
  
      console.log("Formatted Data: ", formattedData);
      setCourseData(formattedData); // Update state with formatted data
    } catch (err) {
      console.error("Error: ", err);
      setCourseData(["Error"]); // Set error state
    }
  };
  
  // Helper function to map stickiness to categories
  function formatStickiness(stickiness) {
    if (stickiness > 0.8) return "high";
    if (stickiness > 0.6) return "medium";
    return "low";
  }
  
  // Helper function to capitalize improvement categories
  function formatImprovement(improvement) {
    return improvement
      ? improvement.charAt(0).toUpperCase() + improvement.slice(1)
      : "Unknown";
  }
  

  const fetchStudentData = async () => {
    try {
      const course_data = await axios.get(
        `${backend_link}courses/${selectedCourse}/classes/${selectedSlot}`
      );
      // console.log(course_data.data);
      const data = course_data.data.map((item) => item.courseName);
      setStudentData(data);
    } catch (err) {
      console.log("error: ", err);
      setStudentData(["Error"]);
    }
  };

  const fetchSessionData = async () => {
    try {
      const course_data = await axios.get(
        `${backend_link}courses/${selectedCourse}/classes/${selectedSlot}`
      );
      // console.log(course_data.data);
      const data = course_data.data.map((item) => item.courseName);
      setSessionData(data);
    } catch (err) {
      console.log("error: ", err);
      setSessionData(["Error"]);
    }
  };

  useEffect(() => {
    if (courseData) {
      fetchCoursesData();
    } else {
      if (activeTable === "students") {
        fetchStudentData();
      } else {
        fetchSessionData();
      }
    }
  }, [courseData]);

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
          <p>{selectedCourse}</p>
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
            <div className="table_view">
              {activeTable === "students" && (
                <p>Students</p>
                // <Table
                //   type="students"
                //   data={tableData}
                //   onSelectedRowsChange={handleSelectedRowsChange}
                //   onRowClick={handleStudentClick}
                // />
              )}
              {activeTable === "sessions" && (
                <p>Sessions</p>
                // <Table
                //   type="sessions"
                //   data={tableData}
                //   onSelectedRowsChange={handleSelectedRowsChange}
                //   onRowClick={handleSessionClick}
                // />
              )}
            </div>
          </>
        ) : (
          <p>Please select a course and a slot to view the data.</p>
        )}
      </div>
    </div>
  );
}

export default Main;
