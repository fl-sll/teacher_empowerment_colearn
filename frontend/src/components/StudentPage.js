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

function StudentPage({ props }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([1, 2, 3]);
  const [tableData, setTableData] = useState();
  const { courseId, slotId, studentId } = useParams();
  const [studentData, setStudentData] = useState({});

  const fetchData = async () => {
    try {
      console.log(studentId);
      // get student data
      const student_data = await axios.get(
        `${backend_link}students/${studentId}`
      );
      const student = student_data.data;

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
        await axios.put(
          `${backend_link}metrics/calculate/student/${studentId}`
        );
        const sessionResponses = await axios.get(
          `${backend_link}sessions/${sessionId}`
        );
        return sessionResponses.data;
      });

      const session_data = await Promise.all(sessionDataPromises);

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
      // console.log("student data: ", student);
      // console.log("metric: ", student.Metric.metricsId);

      const studentMetricsResponse = await axios.get(
        `${backend_link}metrics/${student.Metric.metricsId}`
      );
      const studentMetrics = studentMetricsResponse.data;
      console.log(studentMetrics);

      const formattedData = {
        studentId: student.studentId,
        studentName: student.studentName,
        percentageStickiness: (studentMetrics.stickiness * 100).toFixed(1),
        attendanceRate: (
          (studentMetrics.attendance / studentMetrics.attendanceOver30Mins) *
          100
        ).toFixed(1),
        avgTimeSpent: studentMetrics.avgTimeSpent.toFixed(1),
        attendance30: (
          (studentMetrics.attendanceOver30Mins / studentMetrics.attendance) *
          100
        ).toFixed(1),
        attendanceCount: studentMetrics.attendance,
        correctness: (studentMetrics.correctness * 100).toFixed(0),
      };
      console.log(formattedData);
      setStudentData(formattedData);
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
      number: studentData.percentageStickiness || "...",
    },
    {
      id: 2,
      title: "Attendance",
      sub: "Attendance rate (%)",
      number: studentData.attendanceRate || "...",
    },
    {
      id: 3,
      title: "Time Spent",
      sub: "Average time spent in class",
      number: studentData.avgTimeSpent || "...",
    },
    {
      id: 4,
      title: '30" Attendance',
      sub: "Attendance more than 30 minutes",
      number: studentData.attendance30 || "...",
    },
    {
      id: 5,
      title: "Attendance Count",
      sub: "Class total attendance",
      number: studentData.attendanceCount || "...",
    },
    {
      id: 6,
      title: "Correctness",
      sub: "Class performance from tests",
      number: studentData.correctness || "...",
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
        {studentData.studentName ? (
          <Breadcrumbs
            name={studentData.studentName}
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
                  name={`${studentId}-${studentData.studentName}`}
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
