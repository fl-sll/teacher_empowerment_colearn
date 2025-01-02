import React, { useState } from "react";
import "../styles/Table.css";
import Label from "./Label";
import { Link } from "react-router-dom";

const Table = ({ type, data, onSelectedRowsChange, onRowClick }) => {
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

  // Set headers based on type (students or sessions)
  const headers = type === "students" ? studentHeaders : sessionHeaders;

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
  const filteredHeaders = isSelectable ? headers : headers.filter(header => header !== "Select");

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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="select">
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
              row.name
                ? row.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                      checked={selectedRows.includes(row.name)}
                      onChange={() => handleCheckboxChange(row.name)}
                    />
                  </td>
                )}
                <td>
                  {/* Conditionally render Link for the Name column */}
                  {onSelectedRowsChange || onRowClick ? (
                    <Link to={`/student/${row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {row.name}
                    </Link>
                  ) : (
                    row.name // If no onSelectedRowsChange or onRowClick, render just the name
                  )}
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
