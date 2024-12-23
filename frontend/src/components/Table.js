import React, { useState } from "react";
import "../styles/Table.css";
import Label from "./Label";

const Table = ({ type, onSelectedRowsChange }) => {
  // Define headers for the table based on type
  const studentHeaders = [
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

  const sessionHeaders = [
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

  // Sample data for students and sessions
  const sampleStudentData = [
    {
      name: "John Doe",
      stickiness: "high",
      percentageStickiness: "85%",
      attendanceRate: "90%",
      avgTimeSpent: "45 mins",
      attendance30: "%",
      attendanceCount: 10,
      correctness: "80%",
      improvement: "High",
    },
    {
      name: "Jane Smith",
      stickiness: "medium",
      percentageStickiness: "75%",
      attendanceRate: "88%",
      avgTimeSpent: "40 mins",
      attendance30: "%",
      attendanceCount: 8,
      correctness: "70%",
      improvement: "High",
    },
    {
      name: "Sam Brown",
      stickiness: "low",
      percentageStickiness: "65%",
      attendanceRate: "80%",
      avgTimeSpent: "35 mins",
      attendance30: "%",
      attendanceCount: 7,
      correctness: "60%",
      improvement: "Low",
    },
  ];

  const sampleSessionData = [
    {
      name: "Pertambahan",
      stickiness: "low",
      percentageStickiness: "65%",
      attendanceRate: "80%",
      avgTimeSpent: "35 mins",
      attendance30: "%",
      attendanceCount: 7,
      correctness: "60%",
      improvement: "Low",
    },
    {
      name: "Perkalian",
      stickiness: "low",
      percentageStickiness: "65%",
      attendanceRate: "80%",
      avgTimeSpent: "35 mins",
      attendance30: "%",
      attendanceCount: 7,
      correctness: "60%",
      improvement: "Low",
    },
    {
      name: "Pembagian",
      stickiness: "low",
      percentageStickiness: "65%",
      attendanceRate: "80%",
      avgTimeSpent: "35 mins",
      attendance30: "%",
      attendanceCount: 7,
      correctness: "60%",
      improvement: "Low",
    },
  ];

  // Set data based on the type (students or sessions)
  const [data, setData] = useState(
    type === "students" ? sampleStudentData : sampleSessionData
  );
  const headers = type === "students" ? studentHeaders : sessionHeaders;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // Handle checkbox selection
  const handleCheckboxChange = (index) => {
    const newSelectedRows = selectedRows.includes(index)
      ? selectedRows.filter((i) => i !== index)
      : [...selectedRows, index];

    setSelectedRows(newSelectedRows);
    onSelectedRowsChange(newSelectedRows); // Pass the selected rows to the parent
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="table_div">
      <table className="custom_table">
      <thead>
            <tr>
                {headers.map((header, index) => (
                <th
                    key={index}
                    style={{
                    backgroundColor: index % 2 === 0 ? "#4983F9" : "#1A48D0",
                    }}
                >
                    {header === "Select" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                        fill="#ffffff"
                        d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"
                        />
                    </svg>
                    ) : header === "Name" ? (
                        <>
                        <p>Name</p>
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
              row.name
                ? row.name.toLowerCase().includes(searchTerm.toLowerCase())
                : true
            )
            .map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => handleCheckboxChange(rowIndex)}
                  />
                </td>
                <td>
                  <a
                    // ! Change this to course/slot/student ID (?)
                    href={`/profile/${row.name
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                    style={{ textDecoration: "underline", color: "inherit" }}
                  >
                    {row.name}
                  </a>
                </td>
                <td>
                  <Label text={row.stickiness.toUpperCase()} />
                </td>
                <td>{row.percentageStickiness}</td>
                <td>{row.attendanceRate}</td>
                <td>{row.avgTimeSpent}</td>
                <td>{row.attendance30}</td>
                <td>{row.attendanceCount}</td>
                <td>{row.correctness}</td>
                <td>
                  <Label text={row.improvement.toUpperCase()} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
