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
  const { courseId, slotId, sessionId } = useParams();
  const [sessionData, setSessionData] = useState({});

  const fetchData = async () => {
    try {
      console.log(sessionId);
      // get session name
      const session_data = await axios.get(
        `${backend_link}sessions/${sessionId}`
      );
      const session = session_data.data;
      // setSessionName(name.data.sessionName);
      console.log(session);

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
        await axios.put(
          `${backend_link}metrics/calculate/student/${s}`
        );
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

      const sessionMetricsResponse = await axios.get(
        `${backend_link}metrics/${session.Metric.metricsId}`
      );
      const sessionMetrics = sessionMetricsResponse.data;
      console.log(sessionMetrics);

      const formattedData = {
        sessionId: session.sessionId,
        sessionName: session.sessionName,
        percentageStickiness: (sessionMetrics.stickiness * 100).toFixed(1),
        attendanceRate: (
          (sessionMetrics.attendance / sessionMetrics.attendanceOver30Mins) *
          100
        ).toFixed(1),
        avgTimeSpent: sessionMetrics.avgTimeSpent.toFixed(1),
        attendance30: (
          (sessionMetrics.attendanceOver30Mins / sessionMetrics.attendance) *
          100
        ).toFixed(1),
        attendanceCount: sessionMetrics.attendance,
        correctness: (sessionMetrics.correctness * 100).toFixed(0),
      };
      console.log(formattedData);
      setSessionData(formattedData);
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
      title: "Stickiness",
      sub: "Percentage of the Stickiness",
      number: sessionData.percentageStickiness || "...",
    },
    {
      id: 2,
      title: "Attendance",
      sub: "Attendance rate (%)",
      number: sessionData.attendanceRate || "...",
    },
    {
      id: 3,
      title: "Time Spent",
      sub: "Average time spent in class",
      number: sessionData.avgTimeSpent || "...",
    },
    {
      id: 4,
      title: '30" Attendance',
      sub: "Attendance more than 30 minutes",
      number: sessionData.attendance30 || "...",
    },
    {
      id: 5,
      title: "Attendance Count",
      sub: "Class total attendance",
      number: sessionData.attendanceCount || "...",
    },
    {
      id: 6,
      title: "Correctness",
      sub: "Class performance from tests",
      number: sessionData.correctness || "...",
    },
  ];

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
        {sessionData.sessionName ? (
          <Breadcrumbs
            name={sessionData.sessionName}
            courseId={courseId}
            slotId={slotId}
          />
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
                  name={`${sessionId}-${sessionData.sessionName}`}
                />
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
