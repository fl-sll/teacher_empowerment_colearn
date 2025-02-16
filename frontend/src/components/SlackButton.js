/**
 * @file SlackButton.js
 * @description Component file for rendering a button to send data to Slack in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2025-01-22
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the SlackButton component which allows users to send selected data to a Slack channel.
 * It includes functionality to format the message and send it via a Slack webhook.
 */

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
        <Button
        label={"Send to Slack"}
        logo={slack}
        border={"customize"}
        action={handleSendData}
        aria-label="Send to Slack"
      />
  );
}

export default SlackButton;
