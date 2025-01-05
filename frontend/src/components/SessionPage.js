import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/StudentPage.css";
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

function SessionPage({ props }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([1, 2, 3]);
  const [tableData, setTableData] = useState();
  const { sessionId } = useParams();
  const [sessionName, setSessionName] = useState();

  const fetchData = async () => {
    try {
      console.log(sessionId);
      // get session name
      const name = await axios.get(`${backend_link}sessions/${sessionId}`);

      setSessionName(name.data.sessionName);
      console.log(sessionName);
      // get list of sesionStudent by sessionId
      const sessionStudents = await axios.get(
        `${backend_link}session-students/sessions/${sessionId}`
      );
      console.log(sessionStudents.data);

      // get studentIds
      const studentIds = sessionStudents.data.map((s) => s.studentId);

      // get sessionName by session_id
      const studentResponsePromises = studentIds.map(async (s) => {
        // !! only enable if there are new data
        // await axios.put(
        //   `${backend_link}metrics/calculate/student/${studentId}`
        // );
        const studentResponse = await axios.get(`${backend_link}students/${s}`);
        return studentResponse.data;
      });

      // Resolve all promises to get the detailed student data
      const student_data = await Promise.all(studentResponsePromises);

      // combine data
      const combinedData = sessionStudents.data.map((s) => {
        // Find corresponding sessionData entry
        const studentDetails = student_data.find(
          (student) => student.studentId === s.studentId
        );

        // Create combined object
        return {
          id: studentDetails.studentId,
          sessionName: studentDetails?.studentName || "Unknown", 
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
        {sessionName ? (
          <Breadcrumbs name={sessionName} />
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
                <DownloadButton data={tableData} name={`${sessionId}-${sessionName}`}/>
              ) : (
                <p>Loading data...</p>
              )}
            </div>
          </div>
          <div className="table_view">
            {tableData ? (
              <DetailedTable type="session" data={tableData} />
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </>
      </div>
    </div>
  );
}

export default SessionPage;
