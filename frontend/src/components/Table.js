import React, { useState } from "react";
import "../styles/Table.css";

const Table = ({ type }) => {
  // Define headers for the table based on type
  const studentHeaders = [
    "V",
    "Name",
    "Stickiness",
    "Percentage Stickiness",
    "Attendance Rate",
    "Average Time Spent",
    ">30 mins Attendance",
    "Attendance Count",
    "Correctness",
    "Improvement"
  ];

  const sessionHeaders = [
    "Select",
    "Session ID",
    "Topic",
    "Duration",
    "Attendance Count",
    "Average Rating"
  ];

  // Sample data for students and sessions
  const sampleStudentData = [
    {
      name: "John Doe",
      stickiness: "high",
      percentageStickiness: "85%",
      attendanceRate: "90%",
      avgTimeSpent: "45 mins",
      attendanceCount: 10,
      correctness: "80%",
      improvement: "High"
    },
    {
      name: "Jane Smith",
      stickiness: "medium",
      percentageStickiness: "75%",
      attendanceRate: "88%",
      avgTimeSpent: "40 mins",
      attendanceCount: 8,
      correctness: "70%",
      improvement: "Medium"
    },
    {
      name: "Sam Brown",
      stickiness: "low",
      percentageStickiness: "65%",
      attendanceRate: "80%",
      avgTimeSpent: "35 mins",
      attendanceCount: 7,
      correctness: "60%",
      improvement: "Low"
    }
  ];

  const sampleSessionData = [
    {
      sessionId: 1,
      topic: "Math 101",
      duration: "60 mins",
      attendanceCount: 20,
      avgRating: "4.5/5"
    },
    {
      sessionId: 2,
      topic: "Physics 202",
      duration: "90 mins",
      attendanceCount: 15,
      avgRating: "4.7/5"
    }
  ];

  // Set data based on the type (students or sessions)
  const [data, setData] = useState(type === "students" ? sampleStudentData : sampleSessionData);
  const headers = type === "students" ? studentHeaders : sessionHeaders;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // Handle checkbox selection
  const handleCheckboxChange = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle row click (for details or more actions)
  const handleRowClick = (rowIndex, colIndex) => {
    alert(`You clicked row ${rowIndex + 1}, column ${colIndex + 1}`);
  };

  // Handle sending selected data
  const handleSendData = () => {
    const selectedData = selectedRows.map((rowIndex) => data[rowIndex]);
    alert(`Sending data: ${JSON.stringify(selectedData)}`);
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
                  backgroundColor: index % 2 === 0 ? "#4983F9" : "#1A48D0"
                }}
              >
                {header}
              </th>
            ))}
          </tr>
          <tr>
            {headers.map((_, colIndex) => (
              <td key={colIndex}>
                {colIndex === 1 ? (
                  <input
                    type="text"
                    placeholder="Search Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                ) : (
                  ""
                )}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
            .filter((row) =>
              row.name ? row.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
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
                {headers.slice(1).map((header, colIndex) => {
                  // Dynamically extract field name based on column
                  const field = header.toLowerCase().replace(/\s+/g, '_');
                  // For student data, check if the field exists in the row
                  const cellValue = row[field];

                  return (
                    <td
                      key={colIndex}
                      onClick={() => handleRowClick(rowIndex, colIndex)}
                      className={colIndex === 2 ? `chip ${row.stickiness}` : "button_cell"}
                    >
                      {colIndex === 2 ? cellValue?.toUpperCase() : cellValue || "N/A"}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={handleSendData} className="send_button">
        Send Selected
      </button>
    </div>
  );
};

export default Table;
