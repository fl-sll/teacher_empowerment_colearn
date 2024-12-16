import React from "react";
// require('dotenv').config();

const SlackButton = () => {
  // process.env.WEBHOOK_URL used to access the url from .env
  const webhookUrl = process.env.WEBHOOK_URL;

  const sendToSlack = async () => {
    const message = { text: "Remember to greet new students!" };
  
    try {
      const response = await fetch("http://localhost:8000/api/send-to-slack", {
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
    <button onClick={sendToSlack} style={{ padding: "10px 20px", fontSize: "16px" }}>
      Send to Slack
    </button>
  );
};

export default SlackButton;
