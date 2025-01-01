const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller.js');

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Class management
 */

/**
 * @swagger
 * /courses/{courseId}/classes:
 *   get:
 *     summary: Retrieve a list of classes for a course
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: A list of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */

/**
 * @swagger
 * /courses/{courseId}/classes/{classId}:
 *   get:
 *     summary: Retrieve a single class
 *     tags: [Classes]
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
 *         description: A single class
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found
 */

/**
 * @swagger
 * /courses/{courseId}/classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
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
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: The created class
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 */

/**
 * @swagger
 * /courses/{courseId}/classes/{classId}:
 *   put:
 *     summary: Update a class
 *     tags: [Classes]
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
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: The updated class
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found
 */

/**
 * @swagger
 * /courses/{courseId}/classes/{classId}:
 *   delete:
 *     summary: Delete a class
 *     tags: [Classes]
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
 *       204:
 *         description: Class deleted
 *       404:
 *         description: Class not found
 */

/**
     * @swagger
     * /courses/{courseId}/classes/{classId}/metrics:
     *   put:
     *     summary: Update metrics for a class
     *     tags: [Classes]
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
     *         description: The updated class
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Class'
     *       404:
     *         description: Class not found
     */

router.get('/courses/:courseId/classes', classController.getAllClasses);
router.get('/courses/:courseId/classes/:classId', classController.getClassById);
router.post('/courses/:courseId/classes', classController.createClass);
router.put('/courses/:courseId/classes/:classId', classController.updateClass);
router.delete('/courses/:courseId/classes/:classId', classController.deleteClass);
router.put('/courses/:courseId/classes/:classId/metrics', classController.updateMetrics);

module.exports = app => {
    app.use('/api', router);
};