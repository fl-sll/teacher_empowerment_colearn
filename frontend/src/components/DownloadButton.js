import React, { useState } from "react";
import Button from "./Button";
import download from "../assets/file-arrow-down-solid.svg";
import * as XLSX from "xlsx";

function DownloadButton({ data, name }) {
  const [fileType, setFileType] = useState("csv");

  function jsonToCSV(jsonData) {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      console.error("Data must be a non-empty array");
      return "";
    }

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

  function downloadXLSX(jsonData, filename) {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

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
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <select
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
        style={{ padding: "5px" }}
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
