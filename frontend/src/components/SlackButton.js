import React, { useState } from 'react';
import logo from '../assets/slack_logo.png';

function SlackButton({ selectedRows, onSendData }){
  const webhookUrl = process.env.REACT_APP_WEBHOOK_LINK; 

  const handleSendData = () => {
    onSendData(selectedRows);
  };

  const sendToSlack = async () => {
    const message = { text: "Remember to greet new students!" };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        console.log("Message sent to Slack successfully!");
      } else {
        console.error("Failed to send message to Slack", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message to Slack:", error);
    }
  };

  return (
    <button className="custom_button slack" onClick={handleSendData} style={{ padding: "10px 20px", fontSize: "16px" }}>
      {logo && <img src={logo} alt="Button Logo" className="logo_slack"/>}
      Send Notification
      {webhookUrl}
    </button>
  );
};

export default SlackButton;
