import React, { useState, useEffect } from "react";
import "../styles/Table.css";
import Label from "./Label";

const DetailedTable = ({ type, data }) => {
  const [tableData, setTableData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  console.log("detailed", tableData);
  const headers = [
    "Name",
    "Date",
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
    if (stickiness < 33) {
      return "low";
    } else if (stickiness < 66) {
      return "medium";
    } else {
      return "high";
    }
  }

  function getImprovementCategory(improvement) {
    if (improvement < 0.4) {
      return "low";
    } else if (improvement < 0.7) {
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
            {headers.map((header, index) => (
              <th
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#4983F9" : "#1A48D0",
                }}
              >
                {header === "Name" ? (
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
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.sessionName}</td>
              <td>{row.date}</td>
              <td>{row.Metric ? row.Metric.avgTimeSpent : "N/A"}</td>
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
              <td>{row.Metric ? row.Metric.improvement : "N/A"}</td>
              <td>
                {row.Metric
                  ? 
                  <Label text={getImprovementCategory(row.Metric.improvement).toUpperCase()} />
                  // getImprovementCategory(row.Metric.improvement)
                  : "Loading..."}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailedTable;
