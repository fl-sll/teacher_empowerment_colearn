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
import DownloadButton from "./DownloadButton";
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
  // const [studentData, setStudentData] = useState([]);
  // const [sessionData, setSessionData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  const fetchCoursesData = async () => {
    try {
      const classDataResponse = await axios.get(
        `${backend_link}courses/${selectedCourse}/classes/${selectedSlot}`
      );
      const classData = classDataResponse.data;
      
      // !! only enable if there are new data
      // Fetch sessions associated with the class
      // const sessionsResponse = await axios.get(
      //   `${backend_link}courses/${selectedCourse}/classes/${selectedSlot}/sessions`
      // );
      // const sessionIds = sessionsResponse.data.map((item) => item.sessionId);

      // Renew metrics for each session
      // await Promise.all(
      //   sessionIds.map((sessionId) =>
      //     axios.put(`${backend_link}metrics/calculate/session/${sessionId}`)
      //   )
      // );
      // Calculate metrics for the class
      // await axios.put(`${backend_link}metrics/calculate/class/${selectedSlot}`);

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
        // stickiness: formatStickiness(classMetrics.stickiness),
        percentageStickiness: (classMetrics.stickiness * 100).toFixed(1),
        attendanceRate: (
          (classMetrics.attendance / classMetrics.attendanceOver30Mins) *
          100
        ).toFixed(1),
        avgTimeSpent: classMetrics.avgTimeSpent.toFixed(1),
        attendance30: (
          (classMetrics.attendanceOver30Mins / classMetrics.attendance) *
          100
        ).toFixed(1),
        attendanceCount: classMetrics.attendance,
        correctness: (classMetrics.correctness * 100).toFixed(0),
        // improvement: formatImprovement(classMetrics.improvement),
      };
      console.log("Formatted Data: ", formattedData);
      setCourseData(formattedData); // Update state with formatted data
    } catch (err) {
      console.error("Error: ", err);
      setCourseData(["Error"]); // Set error state
    }
  };

  useEffect(() => {
    if(selectedSlot){
    fetchCoursesData();}
  }, [selectedSlot]);

  const categories = [
    {
      id: 1,
      title: "Stickiness",
      sub: "Percentage of the Stickiness",
      number: courseData.percentageStickiness,
      change: 12.1,
    },
    {
      id: 2,
      title: "Attendance",
      sub: "Attendance rate (%)",
      number: courseData.attendanceRate,
      change: -3.5,
    },
    {
      id: 3,
      title: "Time Spent",
      sub: "Average time spent in class",
      number: courseData.avgTimeSpent,
      change: 5.0,
    },
    {
      id: 4,
      title: '30" Attendance',
      sub: "Attendance more than 30 minutes",
      number: courseData.attendance30,
      change: 1.8,
    },
    {
      id: 5,
      title: "Attendance Count",
      sub: "Class total attendance",
      number: courseData.attendanceCount,
      change: -2.0,
    },
    {
      id: 6,
      title: "Correctness",
      sub: "Class performance from tests",
      number: courseData.correctness,
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
    // console.log("slot: ", selectedSlot);
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
          {/* <p>{selectedCourse}</p>
          <p>{selectedSlot}</p> */}
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
                {/* <DownloadButton data={courseData} name={`${selectedCourse}-${selectedSlot}`}/> */}
              </div>
            </div>
            <div className="button_details">
              <Button label={"Students"} action={showStudentsTable} />
              <Button label={"Sessions"} action={showSessionsTable} />
            </div>
            <div className="table_view">
              {activeTable === "students" && (
                <Table
                  type="students"
                  course={selectedCourse}
                  slot={selectedSlot}
                  onSelectedRowsChange={handleSelectedRowsChange}
                  onRowClick={handleStudentClick}
                />
              )}
              {activeTable === "sessions" && (
                <Table
                  type="sessions"
                  course={selectedCourse}
                  slot={selectedSlot}
                  onSelectedRowsChange={handleSelectedRowsChange}
                  onRowClick={handleSessionClick}
                />
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
