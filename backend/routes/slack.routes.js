/**
 * @file slack.routes.js
 * @description Route file for managing Slack-related API endpoints in the Teacher Empowerment API.
 * @version 1.0.0
 * @date 2025-01-05
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the routes for sending messages to Slack.
 * It uses Express.js to define the routes and Swagger for API documentation.
 */

module.exports = (app) => {
    const express = require("express");
const router = express.Router();
const slackController = require("../controllers/slack.controller");

/**
 * @swagger
 * /send-to-slack:
 *   post:
 *     summary: Send a message to Slack
 *     tags: [Slack]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The message text to send to Slack
 *             required:
 *               - text
 *             example:
 *               text: "Hello, Slack!"
 *     responses:
 *       200:
 *         description: Message sent to Slack successfully
 *       400:
 *         description: Invalid request (missing text property)
 *       500:
 *         description: Internal server error
 */
router.post("/send-to-slack", slackController.sendToSlack);


app.use('/api', router);

}