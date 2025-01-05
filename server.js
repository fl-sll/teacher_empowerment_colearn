require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8080;

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-to-slack", async (req, res) => {
  const slackWebhookUrl = process.env.REACT_APP_WEBHOOK_LINK;
  const message = req.body;

  if (!message || !message.text) {
    return res.status(400).send("Invalid request: 'text' property is required.");
  }

  try {
    console.log("Sending request to Slack:", slackWebhookUrl, message);
    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (response.ok) {
      res.status(200).send("Message sent to Slack successfully!");
    } else {
      const errorText = await response.text();
      console.error("Slack response error:", response.status, errorText);
      res.status(response.status).send(`Failed to send message to Slack: ${errorText}`);
    }
  } catch (error) {
    console.error("Internal error:", error);
    res.status(500).send(`Error sending message to Slack: ${error.message} ${slackWebhookUrl}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
