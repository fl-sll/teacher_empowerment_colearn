const SessionStudent = require("../models/SessionStudent");

exports.getAllSessionStudents = async (req, res) => {
  const sessionStudents = await SessionStudent.findAll();
  res.json(sessionStudents);
};

exports.getSessionStudentById = async (req, res) => {
  const sessionStudent = await SessionStudent.findByPk(req.params.id);
  if (sessionStudent) {
    res.json(sessionStudent);
  } else {
    res.status(404).send("SessionStudent not found");
  }
};

exports.getStudentsInSession = async (req, res) => {
    const sessionStudent = await SessionStudent.findAll({
        where:{
            sessionId: req.params.sessionId
        }
    });
    if (sessionStudent) {
      res.json(sessionStudent);
    } else {
      res.status(404).send("SessionStudent not found");
    }
  };

exports.createSessionStudent = async (req, res) => {
  try {
    const sessionStudent = await SessionStudent.create(req.body);
    res.json(sessionStudent);
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving sessions.",})
  }
};

exports.updateSessionStudent = async (req, res) => {
  const sessionStudent = await SessionStudent.findByPk(req.params.id);
  if (sessionStudent) {
    await sessionStudent.update(req.body);
    res.json(sessionStudent);
  } else {
    res.status(404).send("SessionStudent not found");
  }
};

exports.deleteSessionStudent = async (req, res) => {
  const sessionStudent = await SessionStudent.findByPk(req.params.id);
  if (sessionStudent) {
    await sessionStudent.destroy();
    res.send("SessionStudent deleted");
  } else {
    res.status(404).send("SessionStudent not found");
  }
};
