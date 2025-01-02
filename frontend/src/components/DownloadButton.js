import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'



function DownloadButton({ data }) {
  // Function to convert JSON to CSV
  const jsonToCSV = (jsonData) => {
    const headers = Object.keys(jsonData[0]);
    const csvRows = [];

    // Add the header row
    csvRows.push(headers.join(","));

    // Add the data rows
    for (const row of jsonData) {
      csvRows.push(headers.map((header) => row[header]).join(","));
    }

    return csvRows.join("\n");
  };

  // Function to download the data as a CSV file
  const downloadCSV = () => {
    if (!data || data.length === 0) return;

    const csvData = jsonToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "data.csv"; // Set the download filename
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <button
      className="custom_button slack"
      style={{ padding: "10px 20px", fontSize: "16px" }}
      onClick={downloadCSV}
    >
      <FontAwesomeIcon icon={faDownload} />
      Download Data
    </button>
  );
}

export default DownloadButton;
