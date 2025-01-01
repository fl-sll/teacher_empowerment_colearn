const Course = require('../models/Course');
const { Sequelize } = require("sequelize");


exports.getAllCourses = async (req, res) => {
    const courses = await Course.findAll();
    res.json(courses);
};

exports.getCourseById = async (req, res) => {
    const course = await Course.findByPk(req.params.courseId);
    console.log(course)
    if (course) {
        res.json(course);
    } else {
        res.status(404).send('Course not found');
    }
};

exports.createCourse = async (req, res) => {
    try {
      const course = await Course.create(req.body);
      res.status(201).json(course); // Successfully created
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        res.status(400).json({
          message: "A course with the provided primary key already exists. Please use a different key.",
          error: error.errors.map((e) => e.message), // Optional: include specific error messages
        });
      } else {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "An error occurred while creating the course." });
      }
    }
  };

exports.updateCourse = async (req, res) => {
    const course = await Course.findByPk(req.params.courseId);
    if (course) {
        await course.update(req.body);
        res.json(course);
    } else {
        res.status(404).send('Course not found');
    }
};

exports.deleteCourse = async (req, res) => {
    const course = await Course.findByPk(req.params.courseId);
    if (course) {
        await course.destroy();
        res.send('Course deleted');
    } else {
        res.status(404).send('Course not found');
    }
};

exports.updateMetrics = async (req, res) => {
    const { courseId } = req.params;
    const { stickiness, correctness, attendance } = req.body;
  
    try {
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
  
        course.stickiness = stickiness;
        course.correctness = correctness;
        course.attendance = attendance;
  
        await course.save();
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };