import React from "react";
import Button from "./Button";
import slack from "../assets/slack-brands-solid.svg"
import logo from "../assets/slack_logo.png";

function SlackButton({ selectedRows, onSendData, selectedCourse, selectedSlot }) {
  const webhookUrl = process.env.REACT_APP_SLACK;

  const handleSendData = async () => {
    await sendToSlack(selectedRows);
  };

  const sendToSlack = async (selectedRows) => {
    let messageText;
    if (selectedRows.length === 0) {
      messageText = "You didn't select any names, please select and click the button again. Thank you.";
    } else {
      messageText = "*Here are the list of names that you need to call today:*\n" + 
                    selectedRows.map((name) => `- ${name}`).join("\n");
    }

    // Add course and slot info to the message
    messageText += `\n\n*Course:* ${selectedCourse || "None"}\n*Slot:* ${selectedSlot || "None"}`;

    const message = { text: messageText };

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
    // <button className="custom_button" onClick={handleSendData} style={{ padding: "10px 20px", fontSize: "16px" }}>
    //   {logo && <img src={logo} alt="Button Logo" className="logo_slack"/>}
    //   Send Notification
    // </button>
        <Button
        label={"Send to Slack"}
        logo={slack}
        border={"customize"}
        action={handleSendData}
      />
  );
}

export default SlackButton;
