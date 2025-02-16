/**
 * @file DetailedTable.js
 * @description Component file for rendering a detailed table in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2025-02-16
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the DetailedTable component which displays a table with dynamic headers based on the type prop.
 * It supports search functionality and displays various metrics such as attendance rate, time spent, stickiness, pre-test, post-test, correctness, and improvement.
 */

import React, { useState, useEffect } from "react";
import "../styles/Table.css";
import Label from "./Label";

const DetailedTable = ({ type, data }) => {
  const [tableData, setTableData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  console.log("detailed", tableData);

  // Dynamic headers based on type
  const headers = [
    type === "session" ? "Student Name" : "Session Name",
    type === "session" ? "Attendance Rate" : "Date",
    "Time Spent in Class",
    "Stickiness",
    "Pre-test",
    "Post-test",
    "Correctness",
    "Improvement Percentage",
    "Improvement",
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function getStickinessCategory(stickiness) {
    if (stickiness < 30) {
      return "low";
    } else if (stickiness < 60) {
      return "medium";
    } else {
      return "high";
    }
  }

  function getImprovementCategory(improvement) {
    if (improvement < 0) {
      return "decrease";
    } else if (improvement === 0) {
      return "none";
    } else {
      return "improvement";
    }
  }

  function getPercentage(value) {
    return `${(value * 100).toFixed(1)}%`;
  }

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
                {header === "Session Name" || header === "Student Name" ? (
                  <>
                    {header}
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
          {tableData
            .filter((row) =>
              (type === "session" ? row.sessionName : row.sessionName)
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  {type === "session" ? row.sessionName : row.sessionName}
                </td>
                <td>
                  {type === "session"
                    ? row.Metric
                      ? getPercentage(row.Metric.attendanceRate)
                      : "N/A"
                    : row.date}
                </td>
                <td>
                  {row.Metric ? row.Metric.avgTimeSpent.toFixed(1) : "N/A"}
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
                <td>{row ? row.pretest : "N/A"}</td>
                <td>{row ? row.posttest : "N/A"}</td>
                <td>
                  {row.Metric ? getPercentage(row.Metric.correctness) : "N/A"}
                </td>
                <td>
                  {row.Metric ? getPercentage(row.Metric.improvement) : "N/A"}
                </td>
                <td>
                  {row.Metric ? (
                    <Label
                      text={getImprovementCategory(
                        row.Metric.improvement
                      ).toUpperCase()}
                    />
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

export default DetailedTable;
