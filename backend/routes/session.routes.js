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
     *     summary: Retrieve a list of sessions for a class
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
     *         description: A list of sessions
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Session'
     */

    /**
     * @swagger
     * /courses/{courseId}/classes/{classId}/sessions/{sessionId}:
     *   get:
     *     summary: Retrieve a single session
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
     *         description: A single session
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Session'
     *       404:
     *         description: Session not found
     */

    /**
     * @swagger
     * /courses/{courseId}/classes/{classId}/sessions:
     *   post:
     *     summary: Create a new session
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
     */

    /**
     * @swagger
     * /courses/{courseId}/classes/{classId}/sessions/{sessionId}:
     *   put:
     *     summary: Update a session
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
     */

    /**
     * @swagger
     * /courses/{courseId}/classes/{classId}/sessions/{sessionId}:
     *   delete:
     *     summary: Delete a session
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
     */

module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const sessionController = require('../controllers/session.controller.js');

    router.get('/courses/:courseId/classes/:classId/sessions', sessionController.getAllSessions);
    router.get('/courses/:courseId/classes/:classId/sessions/:sessionId', sessionController.getSessionById);
    router.post('/courses/:courseId/classes/:classId/sessions/', sessionController.createSession);
    router.put('/courses/:courseId/classes/:classId/sessions/:sessionId', sessionController.updateSession);
    router.delete('/courses/:courseId/classes/:classId/sessions/:sessionId', sessionController.deleteSession);

    app.use('/api', router);
};