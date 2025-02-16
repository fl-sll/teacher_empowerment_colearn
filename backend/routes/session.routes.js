/**
 * @file course.routes.js
 * @description Route file for managing session-related API endpoints in the Teacher Empowerment API.
 * @version 1.0.0
 * @date 2025-01-05
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the routes for CRUD operations and other endpoints related to sessions.
 * It uses Express.js to define the routes and Swagger for API documentation.
 */

module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const sessionController = require('../controllers/session.controller.js');

    /**
     * @swagger
     * tags:
     *   name: Sessions
     *   description: Session management
     */

    /**
     * @swagger
     * /courses/{courseId}/classes/{classId}/sessions:
     *   get:
     *     summary: Get all sessions for a class
     *     tags: [Sessions]
     *     parameters:
     *       - in: path
     *         name: courseId
     *         required: true
     *         schema:
     *           type: string
     *         description: The course ID
     *       - in: path
     *         name: classId
     *         required: true
     *         schema:
     *           type: string
     *         description: The class ID
     *     responses:
     *       200:
     *         description: The list of sessions
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Session'
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /courses/{courseId}/classes/{classId}/sessions/{sessionId}:
     *   get:
     *     summary: Get session by ID
     *     tags: [Sessions]
     *     parameters:
     *       - in: path
     *         name: courseId
     *         required: true
     *         schema:
     *           type: string
     *         description: The course ID
     *       - in: path
     *         name: classId
     *         required: true
     *         schema:
     *           type: string
     *         description: The class ID
     *       - in: path
     *         name: sessionId
     *         required: true
     *         schema:
     *           type: string
     *         description: The session ID
     *     responses:
     *       200:
     *         description: The session data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Session'
     *       404:
     *         description: Session not found
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /sessions/{sessionId}:
     *   get:
     *     summary: Get session by ID
     *     tags: [Sessions]
     *     parameters:
     *       - in: path
     *         name: sessionId
     *         required: true
     *         schema:
     *           type: string
     *         description: The session ID
     *     responses:
     *       200:
     *         description: The session data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Session'
     *       404:
     *         description: Session not found
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /courses/{courseId}/classes/{classId}/sessions:
     *   post:
     *     summary: Create a new session
     *     tags: [Sessions]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Session'
     *     responses:
     *       201:
     *         description: The created session
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Session'
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /courses/{courseId}/classes/{classId}/sessions/{sessionId}:
     *   put:
     *     summary: Update session by ID
     *     tags: [Sessions]
     *     parameters:
     *       - in: path
     *         name: courseId
     *         required: true
     *         schema:
     *           type: string
     *         description: The course ID
     *       - in: path
     *         name: classId
     *         required: true
     *         schema:
     *           type: string
     *         description: The class ID
     *       - in: path
     *         name: sessionId
     *         required: true
     *         schema:
     *           type: string
     *         description: The session ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Session'
     *     responses:
     *       200:
     *         description: The updated session
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Session'
     *       404:
     *         description: Session not found
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /courses/{courseId}/classes/{classId}/sessions/{sessionId}:
     *   delete:
     *     summary: Delete session by ID
     *     tags: [Sessions]
     *     parameters:
     *       - in: path
     *         name: courseId
     *         required: true
     *         schema:
     *           type: string
     *         description: The course ID
     *       - in: path
     *         name: classId
     *         required: true
     *         schema:
     *           type: string
     *         description: The class ID
     *       - in: path
     *         name: sessionId
     *         required: true
     *         schema:
     *           type: string
     *         description: The session ID
     *     responses:
     *       204:
     *         description: Session deleted
     *       404:
     *         description: Session not found
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /courses/{courseId}/classes/{classId}/sessions/{sessionId}/metrics:
     *   put:
     *     summary: Update metrics for a session
     *     tags: [Sessions]
     *     parameters:
     *       - in: path
     *         name: courseId
     *         required: true
     *         schema:
     *           type: string
     *         description: The course ID
     *       - in: path
     *         name: classId
     *         required: true
     *         schema:
     *           type: string
     *         description: The class ID
     *       - in: path
     *         name: sessionId
     *         required: true
     *         schema:
     *           type: string
     *         description: The session ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               stickiness:
     *                 type: number
     *               correctness:
     *                 type: number
     *               attendance:
     *                 type: number
     *     responses:
     *       200:
     *         description: The updated session
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Session'
     *       404:
     *         description: Session not found
     *       500:
     *         description: Internal server error
     */

    router.get('/courses/:courseId/classes/:classId/sessions', sessionController.getAllSessions);
    router.get('/courses/:courseId/classes/:classId/sessions/:sessionId', sessionController.getSessionById);
    router.get('/sessions/:sessionId', sessionController.getSessionById);
    router.post('/courses/:courseId/classes/:classId/sessions', sessionController.createSession);
    router.put('/courses/:courseId/classes/:classId/sessions/:sessionId', sessionController.updateSession);
    router.delete('/courses/:courseId/classes/:classId/sessions/:sessionId', sessionController.deleteSession);
    router.put('/courses/:courseId/classes/:classId/sessions/:sessionId/metrics', sessionController.updateMetrics);

    app.use('/api', router);
};