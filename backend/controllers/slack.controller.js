/**
 * @file slack.controller.js
 * @description Controller file for managing Slack-related operations in the Teacher Empowerment API.
 * @version 1.0.0
 * @date 2025-01-0
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file contains the controller function for sending messages to a Slack channel using a webhook URL.
 * It uses the axios library to send HTTP POST requests to the Slack API.
 */

require("dotenv").config();
const axios = require("axios"); // Import axios

exports.sendToSlack = async (req, res) => {
  const slackWebhookUrl = process.env.REACT_APP_WEBHOOK_LINK;
  const message = req.body;

  if (!message || !message.text) {
    return res
      .status(400)
      .send("Invalid request: 'text' property is required.");
  }

  try {
    // Send POST request using axios
    const response = await axios.post(slackWebhookUrl, message, {
      headers: { "Content-Type": "application/json" },
    });

    res.status(200).send("Message sent to Slack successfully!");
  } catch (error) {
    if (error.response) {
      // Handle errors from Slack API
      res
        .status(error.response.status)
        .send(`Failed to send message to Slack: ${error.response.data}`);
    } else {
      // Handle network or other errors
      res
        .status(500)
        .send(`Error sending message to Slack: ${error.message}`);
    }
  }
};
