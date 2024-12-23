import React, { useState } from "react";
import logo from "../logo.svg";
import "../styles/Main.css";
import SlackButton from "./SlackButton";
import Chip from "./Chip";
import SideBar from "./SideBar";
import Header from "./Header";
import Button from "./Button";
import slider from "../assets/sliders-solid.svg";
import Table from "./Table"; // Assuming Table is a general table component

function Main() {
  const [activeTable, setActiveTable] = useState("students"); // State to track active table

  const title = "Avg.Attendance";
  const number = 78.1;
  const sub = "Slot average attendance";
  const change = 12.1;

  // Handlers to change active table view
  const showStudentsTable = () => setActiveTable("students");
  const showSessionsTable = () => setActiveTable("sessions");

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRowsChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };

  const handleSendData = (selectedRows) => {
    alert(`Sending data: ${JSON.stringify(selectedRows)}`);
  };

  return (
    <div className="Main">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main">
        <div className="header">
          <Header />
          {/* Overview */}
        </div>
        <div className="chips">
          <Chip title={title} sub={sub} number={number} change={change} />
          <Chip
            title={"title 2"}
            sub={"subtitle 2"}
            number={50.3}
            change={-18.2}
          />
          <Chip
            title={"title 3"}
            sub={"subtitle 3"}
            number={89.3}
            change={6.2}
          />
          <div className="customize">
            <Button label={"Customize"} logo={slider} border={"customize"} />
            <SlackButton  selectedRows={selectedRows} onSendData={handleSendData} />
          </div>
        </div>
        <div className="button_details">
          <Button label={"Students"} action={showStudentsTable} />
          <Button label={"Sessions"} action={showSessionsTable} />
        </div>
        <div className="table_view">
          {activeTable === "students" && <Table type="students" onSelectedRowsChange={handleSelectedRowsChange}/>}
          {activeTable === "sessions" && <Table type="sessions" onSelectedRowsChange={handleSelectedRowsChange}/>}
        </div>
      </div>
    </div>
  );
}

export default Main;
