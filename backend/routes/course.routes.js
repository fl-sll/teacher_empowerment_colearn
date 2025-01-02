module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const courseController = require('../controllers/course.controller.js');

    /**
     * @swagger
     * tags:
     *   name: Courses
     *   description: Course management
     */

    /**
     * @swagger
     * /courses:
     *   get:
     *     summary: Get all courses
     *     tags: [Courses]
     *     responses:
     *       200:
     *         description: The list of courses
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Course'
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /courses/{courseId}:
     *   get:
     *     summary: Get course by ID
     *     tags: [Courses]
     *     parameters:
     *       - in: path
     *         name: courseId
     *         required: true
     *         schema:
     *           type: string
     *         description: The course ID
     *     responses:
     *       200:
     *         description: The course data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Course'
     *       404:
     *         description: Course not found
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /courses:
     *   post:
     *     summary: Create a new course
     *     tags: [Courses]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Course'
     *     responses:
     *       201:
     *         description: The created course
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Course'
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /courses/{courseId}:
     *   put:
     *     summary: Update course by ID
     *     tags: [Courses]
     *     parameters:
     *       - in: path
     *         name: courseId
     *         required: true
     *         schema:
     *           type: string
     *         description: The course ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Course'
     *     responses:
     *       200:
     *         description: The updated course
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Course'
     *       404:
     *         description: Course not found
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /courses/{courseId}:
     *   delete:
     *     summary: Delete course by ID
     *     tags: [Courses]
     *     parameters:
     *       - in: path
     *         name: courseId
     *         required: true
     *         schema:
     *           type: string
     *         description: The course ID
     *     responses:
     *       204:
     *         description: Course deleted
     *       404:
     *         description: Course not found
     *       500:
     *         description: Internal server error
     */

    /**
     * @swagger
     * /courses/{courseId}/metrics:
     *   put:
     *     summary: Update metrics for a course
     *     tags: [Courses]
     *     parameters:
     *       - in: path
     *         name: courseId
     *         required: true
     *         schema:
     *           type: string
     *         description: The course ID
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
     *                 type: string
     *     responses:
     *       200:
     *         description: The updated course
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Course'
     *       404:
     *         description: Course not found
     *       500:
     *         description: Internal server error
     */

    router.get('/courses', courseController.getAllCourses);
    router.get('/courses/:courseId', courseController.getCourseById);
    router.post('/courses', courseController.createCourse);
    router.put('/courses/:courseId', courseController.updateCourse);
    router.delete('/courses/:courseId', courseController.deleteCourse);
    router.put('/courses/:courseId/metrics', courseController.updateMetrics);

    app.use('/api', router);
};