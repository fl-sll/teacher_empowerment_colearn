const Student = require("../models/Student");

exports.getAllStudents = async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
};

exports.getStudentById = async (req, res) => {
  const student = await Student.findByPk(req.params.studentId);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send("Student not found");
  }
};

exports.createStudent = async (req, res) => {
    try {
      const student = await Student.create(req.body);
      res.status(201).json(student); // Use status 201 for successful creation
    } catch (err) {
      res.status(500).send({
        message: err.message || "An error occurred while creating the student.",
      });
    }
  };
  
exports.updateStudent = async (req, res) => {
  const student = await Student.findByPk(req.params.studentId);
  if (student) {
    await student.update(req.body);
    res.json(student);
  } else {
    res.status(404).send("Student not found");
  }
};

exports.deleteStudent = async (req, res) => {
  const student = await Student.findByPk(req.params.studentId);
  if (student) {
    await student.destroy();
    res.send("Student deleted");
  } else {
    res.status(404).send("Student not found");
  }
};
