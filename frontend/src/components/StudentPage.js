import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/StudentPage.css";
// import slotData from "./data";
// import SlackButton from "./SlackButton";
import Chip from "./Chip";
import SideBar from "./SideBar";
import { backend_link } from "./CONST";
import Button from "./Button";
import slider from "../assets/sliders-solid.svg";
import axios from "axios";
import Popup from "./Popup";
import DetailedTable from "./DetailedTable";
import DownloadButton from "./DownloadButton";
import Breadcrumbs from "./Breadcrumbs";

function StudentPage({ props }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([1, 2, 3]);
  const [tableData, setTableData] = useState();
  const { courseId, slotId, studentId } = useParams();
  const [studentName, setStudentName] = useState();
  const fetchData = async () => {
    try {
      console.log(studentId);
      // get student name
      const name = await axios.get(`${backend_link}students/${studentId}`);

      setStudentName(name.data.studentName);
      console.log(studentName);
      // get list of sesionStudent by studentID
      const sessionStudents = await axios.get(
        `${backend_link}session-students/students/${studentId}`
      );
      console.log(sessionStudents.data);

      // get session_ids
      const sesssionIds = sessionStudents.data.map((s) => s.sessionId);

      // get sessionName by session_id
      const sessionDataPromises = sesssionIds.map(async (sessionId) => {
        // !! only enable if there are new data
        // await axios.put(
        //   `${backend_link}metrics/calculate/student/${studentId}`
        // );
        const sessionResponses = await axios.get(
          `${backend_link}sessions/${sessionId}`
        );
        return sessionResponses.data;
      });

      // Resolve all promises to get the detailed student data
      const session_data = await Promise.all(sessionDataPromises);

      // combine data
      const combinedData = sessionStudents.data.map((s) => {
        // Find corresponding sessionData entry
        const sessionDetails = session_data.find(
          (session) => session.sessionId === s.sessionId
        );

        // Create combined object
        return {
          sessionName: sessionDetails?.sessionName || "Unknown", // Fallback to "Unknown" if not found
          date: sessionDetails?.date || "Unknown",
          pretest: s.pretest,
          posttest: s.posttest,
          Metric: s.Metric, // Metrics from sessionStudents
        };
      });

      setTableData(combinedData);
      console.log(combinedData);
    } catch (err) {
      console.log("error: ", err);
      setTableData(["Error"]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  // const handleSendData = (selectedRows) => {
  //   alert(`Sending data: ${JSON.stringify(selectedRows)}`);
  // };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSelectCategories = (categories) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="Main">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main">
        {/* new header here */}
        {/* <Breadcrumbs name={studentName} /> */}
        {studentName ? (
          <Breadcrumbs name={studentName} courseId={courseId} slotId={slotId}/>
        ) : (
          <p>Loading data...</p>
        )}
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
              {tableData ? (
                <DownloadButton
                  data={tableData}
                  name={`${studentId}-${studentName}`}
                />
              ) : (
                <p>Loading data...</p>
              )}
            </div>
          </div>
          <div className="table_view">
            {tableData ? (
              <DetailedTable type="student" data={tableData} />
            ) : (
              <p>Loading data...</p>
            )}
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
