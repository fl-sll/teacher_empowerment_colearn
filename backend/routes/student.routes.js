/**
 * @file student.routes.js
 * @description Route file for managing student-related API endpoints in the Teacher Empowerment API.
 * @version 1.0.0
 * @date 2025-01-22
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the routes for CRUD operations and other endpoints related to students.
 * It uses Express.js to define the routes and Swagger for API documentation.
 */

module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const studentController = require('../controllers/student.controller.js');

    /**
     * @swagger
     * tags:
     *   name: Students
     *   description: Student management
     */

    /**
     * @swagger
     * /students:
     *   get:
     *     summary: Retrieve a list of students
     *     tags: [Students]
     *     responses:
     *       200:
     *         description: A list of students
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Student'
     */

    /**
     * @swagger
     * /students/{studentId}:
     *   get:
     *     summary: Retrieve a single student
     *     tags: [Students]
     *     parameters:
     *       - in: path
     *         name: studentId
     *         required: true
     *         schema:
     *           type: string
     *         description: The student ID
     *     responses:
     *       200:
     *         description: A single student
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Student'
     *       404:
     *         description: Student not found
     */

    /**
     * @swagger
     * /students:
     *   post:
     *     summary: Create a new student
     *     tags: [Students]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Student'
     *     responses:
     *       201:
     *         description: The created student
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Student'
     */

    /**
     * @swagger
     * /students/{studentId}:
     *   put:
     *     summary: Update a student
     *     tags: [Students]
     *     parameters:
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
     *             $ref: '#/components/schemas/Student'
     *     responses:
     *       200:
     *         description: The updated student
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Student'
     *       404:
     *         description: Student not found
     */

    /**
     * @swagger
     * /students/{studentId}:
     *   delete:
     *     summary: Delete a student
     *     tags: [Students]
     *     parameters:
     *       - in: path
     *         name: studentId
     *         required: true
     *         schema:
     *           type: string
     *         description: The student ID
     *     responses:
     *       204:
     *         description: Student deleted
     *       404:
     *         description: Student not found
     */

    /**
     * @swagger
     * /students/{studentId}/metrics:
     *   put:
     *     summary: Update metrics for a student
     *     tags: [Students]
     *     parameters:
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
     *               improvement:
     *                 type: float
     *     responses:
     *       200:
     *         description: The updated student
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Student'
     *       404:
     *         description: Student not found
     *       500:
     *         description: Internal server error
     */


    router.get('/students/', studentController.getAllStudents);
    router.get('/students/:studentId', studentController.getStudentById);
    router.post('/students/', studentController.createStudent);
    router.put('/students/:studentId', studentController.updateStudent);
    router.delete('/students/:studentId', studentController.deleteStudent);
    router.put('/students/:studentId/metrics', studentController.updateMetrics);

    app.use('/api', router);
};