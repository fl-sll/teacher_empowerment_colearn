const { Sequelize } = require("sequelize");
const Course = require('../models/Course');
const Metrics = require('../models/Metrics');


exports.getAllCourses = async (req, res) => {
    try {
      const courses = await Course.findAll({
        // include: Metrics,
      });
      res.send(courses);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    }
  };

exports.getCourseById = async (req, res) => {
    try {
      const course = await Course.findOne({
        where: {
          courseId: req.params.courseId,
        },
        include: Metrics,
      });
      if (course) {
        res.send(course);
      } else {
        res.status(404).send({
          message: "Course not found with the specified courseId",
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    }
};

// exports.createCourse = async (req, res) => {
//     try {
//       const course = await Course.create(req.body);
//       res.status(201).json(course); // Successfully created
//     } catch (error) {
//       if (error instanceof Sequelize.UniqueConstraintError) {
//         res.status(400).json({
//           message: "A course with the provided primary key already exists. Please use a different key.",
//           error: error.errors.map((e) => e.message), // Optional: include specific error messages
//         });
//       } else {
//         console.error("Error creating course:", error);
//         res.status(500).json({ message: "An error occurred while creating the course." });
//       }
//     }
//   };

exports.createCourse = async (req, res) => {
    try {
      const course = await Course.create(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// exports.updateCourse = async (req, res) => {
//     const course = await Course.findByPk(req.params.courseId);
//     if (course) {
//         await course.update(req.body);
//         res.json(course);
//     } else {
//         res.status(404).send('Course not found');
//     }
// };

exports.updateCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      await course.update(req.body);
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// exports.deleteCourse = async (req, res) => {
//     const course = await Course.findByPk(req.params.courseId);
//     if (course) {
//         await course.destroy();
//         res.send('Course deleted');
//     } else {
//         res.status(404).send('Course not found');
//     }
// };

exports.deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      await course.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.updateMetrics = async (req, res) => {
    const { courseId } = req.params;
    const { stickiness, correctness, attendance, improvement } = req.body;
  
    try {
      const course = await Course.findByPk(courseId, {
        include: Metrics,
      });
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      if (course.Metrics) {
        course.Metrics.stickiness = stickiness;
        course.Metrics.correctness = correctness;
        course.Metrics.attendance = attendance;
        course.Metrics.improvement = improvement;
        await course.Metrics.save();
      } else {
        const metrics = await Metrics.create({
          courseId,
          stickiness,
          correctness,
          attendance,
          improvement,
        });
        course.metricsId = metrics.metricsId;
        await course.save();
      }
  
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};