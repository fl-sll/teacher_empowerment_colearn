module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const slackController = require('../controllers/slack.controller.js');

    /**
     * @swagger
     * tags:
     *   name: Slack
     *   description: Slack integration
     */

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
     *                 description: The message text
     *     responses:
     *       200:
     *         description: Message sent to Slack successfully
     *       400:
     *         description: Invalid request
     *       500:
     *         description: Internal server error
     */

    router.post('/send-to-slack', slackController.sendToSlack);

    app.use('/api', router);
};