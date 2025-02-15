/**
 * @file DownloadButton.js
 * @description Component file for rendering a download button in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2025-01-12
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the DownloadButton component which allows users to download data in CSV or XLSX format.
 * It includes functionality to flatten nested objects and convert JSON data to CSV or XLSX files.
 */

import React, { useState } from "react";
import Button from "./Button";
import download from "../assets/file-arrow-down-solid.svg";
import * as XLSX from "xlsx";
import "../styles/Button.css";

function DownloadButton({ data, name }) {
  const [fileType, setFileType] = useState("csv");

  // Function to flatten objects
  function flattenObject(obj, parentKey = "", result = {}) {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        flattenObject(value, newKey, result);
      } else {
        result[newKey] = value;
      }
    }
    return result;
  }

  // Convert JSON to CSV
  function jsonToCSV(jsonData) {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      console.error("Data must be a non-empty array");
      return "";
    }

    const flattenedData = jsonData.map((item) => flattenObject(item));
    const headers = Array.from(new Set(flattenedData.flatMap(Object.keys)));

    const csvContent = [
      headers.join(","), 
      ...flattenedData.map(
        (row) =>
          headers.map((header) => JSON.stringify(row[header] ?? "")).join(",")
      ),
    ].join("\n");

    return csvContent;
  }

  // Download CSV
  function downloadCSV(jsonData, filename) {
    const csvContent = jsonToCSV(jsonData);
    if (!csvContent) {
      console.error("Failed to convert JSON to CSV");
      return;
    }

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // Download XLSX
  function downloadXLSX(jsonData, filename) {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      console.error("Data must be a non-empty array");
      return;
    }

    // Flatten each object in the dataset
    const flattenedData = jsonData.map((item) => flattenObject(item));

    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

  // Handle file download
  function handleDownload() {
    if (!data || !name) {
      console.error("Invalid data or filename");
      return;
    }

    if (fileType === "csv") {
      downloadCSV(data, name);
    } else if (fileType === "xlsx") {
      downloadXLSX(data, name);
    } else {
      console.error("Unsupported file type");
    }
  }

  return (
    <div className="download_container">
      <select
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
        className="dropdown"
      >
        <option value="csv">CSV</option>
        <option value="xlsx">XLSX</option>
      </select>
      <Button
        label={"Download"}
        logo={download}
        border={"customize"}
        action={handleDownload}
      />
    </div>
  );
}

export default DownloadButton;
