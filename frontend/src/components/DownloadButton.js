import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function DownloadButton({ data }) {
  function jsonToCSV(jsonData) {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
        console.error("Data must be a non-empty array");
        return "";
    }

    // Helper function to flatten nested JSON
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

    // Flatten all objects in the array
    const flattenedData = jsonData.map(item => flattenObject(item));

    // Extract headers dynamically
    const headers = Array.from(new Set(flattenedData.flatMap(Object.keys)));

    // Build CSV content
    const csvContent = [
        headers.join(","), // Header row
        ...flattenedData.map(row =>
            headers.map(header => JSON.stringify(row[header] ?? "")).join(",") // Data rows
        )
    ].join("\n");

    return csvContent;
  }

  // Function to download data as a CSV file
  function downloadCSV(jsonData, filename = 'data.csv') {
      const csvContent = jsonToCSV(jsonData);
      if (!csvContent) {
          console.error("Failed to convert JSON to CSV");
          return;
      }

      // Create a Blob from the CSV content
      const blob = new Blob([csvContent], { type: 'text/csv' });

      // Create a link to download the Blob
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;

      // Trigger the download
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href);
  }

  return (
    <button
      className="custom_button slack"
      style={{ padding: "10px 20px", fontSize: "16px" }}
      onClick={() => downloadCSV(data)}
    >
      <FontAwesomeIcon icon={faDownload} />
      Download Data
    </button>
  );
}

export default DownloadButton;
