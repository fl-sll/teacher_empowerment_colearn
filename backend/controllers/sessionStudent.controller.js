const SessionStudent = require("../models/SessionStudent");
const Metrics = require("../models/Metrics");

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
    where: {
      sessionId: req.params.sessionId,
    },
  });
  if (sessionStudent) {
    res.json(sessionStudent);
  } else {
    res.status(404).send("Session not found");
  }
};

exports.getStudentsByStudentId = async (req, res) => {
  console.log("student id ", req.params.studentId);
  const sessionStudent = await SessionStudent.findAll({
    where: {
      studentId: req.params.studentId,
    },
  });
  if (sessionStudent) {
    res.json(sessionStudent);
  } else {
    res.status(404).send("Student not found");
  }
};

exports.createSessionStudent = async (req, res) => {
  try {
    const sessionStudent = await SessionStudent.create(req.body);
    res.json(sessionStudent);
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving sessions.",
    });
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

exports.updateMetrics = async (req, res) => {
  const { sessionId, studentId } = req.params;
  const {
    stickiness,
    correctness,
    attendance,
    pretest,
    posttest,
    improvement,
  } = req.body;

  try {
    const sessionStudent = await SessionStudent.findOne({
      where: { sessionId, studentId },
      include: Metrics,
    });
    if (!sessionStudent) {
      return res.status(404).json({ message: "SessionStudent not found" });
    }

    if (sessionStudent.Metrics) {
      sessionStudent.Metrics.stickiness = stickiness;
      sessionStudent.Metrics.correctness = correctness;
      sessionStudent.Metrics.attendance = attendance;
      sessionStudent.Metrics.pretest = pretest;
      sessionStudent.Metrics.posttest = posttest;
      sessionStudent.Metrics.improvement = improvement;
      await sessionStudent.Metrics.save();
    } else {
      const metrics = await Metrics.create({
        sessionId,
        studentId,
        stickiness,
        correctness,
        attendance,
        pretest,
        posttest,
        improvement,
      });
      sessionStudent.metricsId = metrics.metricsId;
      await sessionStudent.save();
    }

    res.status(200).json(sessionStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
