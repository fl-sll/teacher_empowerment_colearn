const Student = require('../models/Student');

exports.getAllStudents = async (req, res) => {
    const students = await Student.findAll();
    res.json(students);
};

exports.getStudentById = async (req, res) => {
    const student = await Student.findByPk(req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Student not found');
    }
};

exports.createStudent = async (req, res) => {
    const student = await Student.create(req.body);
    res.json(student);
};

exports.updateStudent = async (req, res) => {
    const student = await Student.findByPk(req.params.id);
    if (student) {
        await student.update(req.body);
        res.json(student);
    } else {
        res.status(404).send('Student not found');
    }
};

exports.deleteStudent = async (req, res) => {
    const student = await Student.findByPk(req.params.id);
    if (student) {
        await student.destroy();
        res.send('Student deleted');
    } else {
        res.status(404).send('Student not found');
    }
};