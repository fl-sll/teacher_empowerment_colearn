/**
 * @file student.controller.js
 * @description Controller file for managing student-related operations in the Teacher Empowerment API.
 * @version 1.0.0
 * @date 2025-01-05
 * @authors
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 *
 * @details
 * This file contains the controller functions for handling CRUD operations and other business logic related to students.
 * It interacts with the Student and Metrics models to perform database operations.
 */

const Student = require("../models/Student");
const Metrics = require("../models/Metrics");

exports.getAllStudents = async (req, res) => {
  const students = await Student.findAll({
    include: [
      {
        model: Metrics,
      },
    ],
  });
  res.json(students);
};

exports.getStudentById = async (req, res) => {
  // const student = await Student.findByPk(req.params.studentId);
  const student = await Student.findOne({
    where: {
      studentId: req.params.studentId,
    },
    include: [
      {
        model: Metrics,
      },
    ],
  });
  if (student) {
    res.json(student);
  } else {
    res.status(404).send("Student not found");
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    await student.update(req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    await student.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMetrics = async (req, res) => {
  const { studentId } = req.params;
  const { stickiness, correctness, attendance, improvement } = req.body;

  try {
    const student = await Student.findByPk(studentId, {
      include: Metrics,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.Metrics) {
      student.Metrics.stickiness = stickiness;
      student.Metrics.correctness = correctness;
      student.Metrics.attendance = attendance;
      student.Metrics.improvement = improvement;
      await student.Metrics.save();
    } else {
      const metrics = await Metrics.create({
        studentId,
        stickiness,
        correctness,
        attendance,
        improvement,
      });
      student.metricsId = metrics.metricsId;
      await student.save();
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
