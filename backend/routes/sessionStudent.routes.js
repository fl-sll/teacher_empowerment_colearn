/**
 * @file course.routes.js
 * @description Route file for managing sessionstudent-related API endpoints in the Teacher Empowerment API.
 * @version 1.0.0
 * @date 2025-01-22
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the routes for CRUD operations and other endpoints related to sessionstudents.
 * It uses Express.js to define the routes and Swagger for API documentation.
 */

module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const sessionStudentController = require('../controllers/sessionStudent.controller.js'); // Updated controller path

    /**
     * @swagger
     * tags:
     *   name: SessionStudents
     *   description: Session student management
     */

    /**
     * @swagger
     * /session-students:
     *   get:
     *     summary: Retrieve a list of session students
     *     tags: [SessionStudents]
     *     responses:
     *       200:
     *         description: A list of session students
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/SessionStudent'
     */
    router.get('/session-students/', sessionStudentController.getAllSessionStudents);

    /**
     * @swagger
     * /session-students/sessions/{sessionId}:
     *   get:
     *     summary: Retrieve a list of student in session
     *     tags: [SessionStudents]
     *     parameters:
     *       - in: path
     *         name: sessionId
     *         required: true
     *         schema:
     *           type: string
     *         description: The session ID
     *     responses:
     *       200:
     *         description: A list of students in the sesssion
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SessionStudent'
     *       404:
     *         description: Session not found
     */
    router.get('/session-students/sessions/:sessionId', sessionStudentController.getStudentsInSession);


    /**
     * @swagger
     * /session-students/students/{studentId}:
     *   get:
     *     summary: Retrieve a list of session by student id
     *     tags: [SessionStudents]
     *     parameters:
     *       - in: path
     *         name: studentId
     *         required: true
     *         schema:
     *           type: string
     *         description: The student ID
     *     responses:
     *       200:
     *         description: A list of students in the sesssion
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SessionStudent'
     *       404:
     *         description: Session not found
     */
    router.get('/session-students/students/:studentId', sessionStudentController.getStudentsByStudentId);

    /**
     * @swagger
     * /session-students/{id}:
     *   get:
     *     summary: Retrieve a single session student
     *     tags: [SessionStudents]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The session student ID
     *     responses:
     *       200:
     *         description: A single session student
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SessionStudent'
     *       404:
     *         description: Session student not found
     */
    router.get('/session-students/:id', sessionStudentController.getSessionStudentById);

    /**
     * @swagger
     * /session-students:
     *   post:
     *     summary: Create a new session student
     *     tags: [SessionStudents]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SessionStudent'
     *     responses:
     *       201:
     *         description: The created session student
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SessionStudent'
     */
    router.post('/session-students/', sessionStudentController.createSessionStudent);

    /**
     * @swagger
     * /session-students/{id}:
     *   put:
     *     summary: Update a session student
     *     tags: [SessionStudents]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The session student ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *              type: object
     *              properties:
     *                  posttest:
     *                      type: number
     *                  pretest:
     *                      type: number
     *     responses:
     *       200:
     *         description: The updated session student
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SessionStudent'
     *       404:
     *         description: Session student not found
     */
    router.put('/session-students/:id', sessionStudentController.updateSessionStudent);

    /**
     * @swagger
     * /session-students/{id}:
     *   delete:
     *     summary: Delete a session student
     *     tags: [SessionStudents]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The session student ID
     *     responses:
     *       204:
     *         description: Session student deleted
     *       404:
     *         description: Session student not found
     */
    router.delete('/session-students/:id', sessionStudentController.deleteSessionStudent);

    /**
     * @swagger
     * /sessions/{sessionId}/students/{studentId}/metrics:
     *   put:
     *     summary: Update metrics for a session-student record
     *     tags: [SessionStudents]
     *     parameters:
     *       - in: path
     *         name: sessionId
     *         required: true
     *         schema:
     *           type: string
     *         description: The session ID
     *       - in: path
     *         name: studentId
     *         required: true
     *         schema:
     *           type: string
     *         description: The student ID
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
     *               pretest:
     *                 type: number
     *               posttest:
     *                 type: number
     *               improvement:
     *                 type: float
     *     responses:
     *       200:
     *         description: The updated session-student record
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SessionStudent'
     *       404:
     *         description: Session-Student record not found
     */

    router.put('/session-students/:id/metrics', sessionStudentController.updateMetrics);

    app.use('/api', router);
};
