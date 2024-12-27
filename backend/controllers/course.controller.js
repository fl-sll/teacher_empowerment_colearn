const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
    const courses = await Course.findAll();
    res.json(courses);
};

exports.getCourseById = async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
        res.json(course);
    } else {
        res.status(404).send('Course not found');
    }
};

exports.createCourse = async (req, res) => {
    const course = await Course.create(req.body);
    res.json(course);
};

exports.updateCourse = async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
        await course.update(req.body);
        res.json(course);
    } else {
        res.status(404).send('Course not found');
    }
};

exports.deleteCourse = async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
        await course.destroy();
        res.send('Course deleted');
    } else {
        res.status(404).send('Course not found');
    }
};