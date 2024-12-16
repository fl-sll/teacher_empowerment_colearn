const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors"); // Import cors middleware
// require("dotenv").config();

const app = express();
const PORT = 8000;

// Enable CORS for all routes and origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Proxy route to send data to Slack
app.post("/api/send-to-slack", async (req, res) => {
  // process.env.WEBHOOK_URL used to access the url from .env
  const slackWebhookUrl = process.env.WEBHOOK_LINK;
  const message = req.body;

  try {
    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (response.ok) {
      res.status(200).send("Message sent to Slack successfully!");
    } else {
      res.status(response.status).send("Failed to send message to Slack");
    }
  } catch (error) {
    res.status(500).send("Error sending message to Slack");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
