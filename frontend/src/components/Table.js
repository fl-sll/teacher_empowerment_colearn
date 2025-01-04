import React, { useState, useEffect } from "react";
import "../styles/Table.css";
import Label from "./Label";
import { Link } from "react-router-dom";
import { backend_link } from "./CONST";
import axios from "axios";

const Table = ({ type, course, slot, onSelectedRowsChange, onRowClick }) => {
  const headers = [
    "Select",
    "Name",
    "Stickiness",
    "Percentage Stickiness",
    "Attendance Rate",
    "Average Time Spent",
    ">30 mins Attendance",
    "Attendance Count",
    "Correctness",
    "Improvement",
  ];

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      // get student data
      const session = await axios.get(
        `${backend_link}courses/${course}/classes/${slot}/sessions`
      );
      const session_id = session.data[0].sessionId;
      console.log(session_id);
      const students = await axios.get(
        `${backend_link}session-students/sessions/${session_id}`
      );
      const student_ids = students.data.map((s) => s.studentId);

      // Fetch detailed student data
      const studentDataPromises = student_ids.map(async (studentId) => {
        await axios.put(`${backend_link}metrics/calculate/student/${studentId}`);
        const studentResponse = await axios.get(
          `${backend_link}students/${studentId}`
        );
        return studentResponse.data;
      });

      // Resolve all promises to get the detailed student data
      const student_data = await Promise.all(studentDataPromises);
      console.log(student_data);
      console.log(student_data[0].studentName);
      console.log(student_data[0].Metric.stickiness);
      setData(student_data);
    } catch (err) {
      console.log("error: ", err);
      setData(["Error"]);
    }
  };

  useEffect(() => {
    if (data) {
      fetchData();
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // Handle checkbox selection
  const handleCheckboxChange = (index) => {
    const newSelectedRows = selectedRows.includes(index)
      ? selectedRows.filter((i) => i !== index)
      : [...selectedRows, index];

    setSelectedRows(newSelectedRows);
    onSelectedRowsChange && onSelectedRowsChange(newSelectedRows);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Check if `onSelectedRowsChange` or `onRowClick` is provided
  const isSelectable = onSelectedRowsChange || onRowClick;

  // Conditionally filter out "Select" header if not needed
  const filteredHeaders = isSelectable
    ? headers
    : headers.filter((header) => header !== "Select");

  function getStickinessCategory(stickiness) {
    if (stickiness < 33) {
      return "low";
    } else if (stickiness < 66) {
      return "medium";
    } else {
      return "high";
    }
  }

  function getPercentage(value) {
    return value * 100;
  }

  return (
    <div className="table_div">
      <table className="custom_table">
        <thead>
          <tr>
            {filteredHeaders.map((header, index) => (
              <th
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#4983F9" : "#1A48D0",
                }}
              >
                {header === "Select" && isSelectable ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="select"
                  >
                    <path
                      fill="#ffffff"
                      d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"
                    />
                  </svg>
                ) : header === "Name" ? (
                  <>
                    Name
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </>
                ) : (
                  header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
            .filter((row) =>
              row.studentName
                ? row.studentName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                : true
            )
            .map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {isSelectable && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.studentName)}
                      onChange={() => handleCheckboxChange(row.studentName)}
                    />
                  </td>
                )}
                <td>
                  {/* Conditionally render Link for the Name column */}
                  {onSelectedRowsChange || onRowClick ? (
                    <Link
                      to={`/student/${row.studentId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {row.studentName}
                    </Link>
                  ) : (
                    row.studentName // If no onSelectedRowsChange or onRowClick, render just the name
                  )}
                </td>
                <td>
                  {row.Metric ? (
                    <Label
                      text={getStickinessCategory(
                        row.Metric.stickiness
                      ).toUpperCase()}
                    />
                  ) : (
                    "Loading..."
                  )}
                </td>
                <td>
                  {row.Metric ? getPercentage(row.Metric.stickiness) : "N/A"}
                </td>
                <td>{row.Metric ? row.attendanceRate : "N/A"}</td>
                <td>{row.Metric ? row.Metric.avgTimeSpent : "N/A"}</td>
                <td>{row.Metric ? row.Metric.attendanceOver30Mins : "N/A"}</td>
                <td>{row.Metric ? row.Metric.attendance : "N/A"}</td>
                <td>
                  {row.Metric ? getPercentage(row.Metric.correctness) : "N/A"}
                </td>
                <td>
                  {row.Metric ? (
                    <Label text={row.Metric.improvement.toUpperCase()} />
                  ) : (
                    "Loading..."
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
