module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const metricsController = require('../controllers/metrics.controller.js');

    /**
     * @swagger
     * tags:
     *   name: Metrics
     *   description: Metrics management
     */

    /**
     * @swagger
     * /metrics:
     *   post:
     *     summary: Create new metrics
     *     tags: [Metrics]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Metrics'
     *     responses:
     *       201:
     *         description: The created metrics
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Metrics'
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /metrics/{metricsId}:
     *   get:
     *     summary: Get metrics by ID
     *     tags: [Metrics]
     *     parameters:
     *       - in: path
     *         name: metricsId
     *         required: true
     *         schema:
     *           type: integer
     *         description: The metrics ID
     *     responses:
     *       200:
     *         description: The metrics data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Metrics'
     *       404:
     *         description: Metrics not found
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /metrics/{metricsId}:
     *   put:
     *     summary: Update metrics by ID
     *     tags: [Metrics]
     *     parameters:
     *       - in: path
     *         name: metricsId
     *         required: true
     *         schema:
     *           type: integer
     *         description: The metrics ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Metrics'
     *     responses:
     *       200:
     *         description: The updated metrics
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Metrics'
     *       404:
     *         description: Metrics not found
     *       500:
     *         description: Internal server error
     */


    /**
     * @swagger
     * /metrics/calculate/student/{studentId}:
     *   put:
     *     summary: Update metrics by studentID
     *     tags: [Metrics]
     *     parameters:
     *       - in: path
     *         name: studentId
     *         required: true
     *         schema:
     *           type: string
     *         description: The Student ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Metrics'
     *     responses:
     *       200:
     *         description: The updated metrics
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Metrics'
     *       404:
     *         description: Metrics not found
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /metrics/calculate/session/{sessionId}:
     *   put:
     *     summary: Update metrics by sessionID
     *     tags: [Metrics]
     *     parameters:
     *       - in: path
     *         name: sessionId
     *         required: true
     *         schema:
     *           type: string
     *         description: The Session ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Metrics'
     *     responses:
     *       200:
     *         description: The updated metrics
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Metrics'
     *       404:
     *         description: Metrics not found
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /metrics/calculate/class/{classId}:
     *   put:
     *     summary: Update metrics by classId
     *     tags: [Metrics]
     *     parameters:
     *       - in: path
     *         name: classId
     *         required: true
     *         schema:
     *           type: string
     *         description: The Class ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Metrics'
     *     responses:
     *       200:
     *         description: The updated metrics
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Metrics'
     *       404:
     *         description: Metrics not found
     *       500:
     *         description: Internal server error
     */


    /**
     * @swagger
     * /metrics/{metricsId}:
     *   delete:
     *     summary: Delete metrics by ID
     *     tags: [Metrics]
     *     parameters:
     *       - in: path
     *         name: metricsId
     *         required: true
     *         schema:
     *           type: integer
     *         description: The metrics ID
     *     responses:
     *       204:
     *         description: Metrics deleted
     *       404:
     *         description: Metrics not found
     *       500:
     *         description: Internal server error
     */

    router.post('/metrics', metricsController.createMetrics);
    router.get('/metrics/:metricsId', metricsController.getMetricsById);
    router.put('/metrics/:metricsId', metricsController.updateMetrics);
    router.put('/metrics/calculate/student/:studentId', metricsController.calculateStudent);
    router.put('/metrics/calculate/session/:sessionId', metricsController.calculateSession);
    router.put('/metrics/calculate/class/:classId', metricsController.calculateClass);
    router.delete('/metrics/:metricsId', metricsController.deleteMetrics);

    app.use('/api', router);
};