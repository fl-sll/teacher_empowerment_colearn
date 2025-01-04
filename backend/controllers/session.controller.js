const Session = require("../models/Session");
const Metrics = require("../models/Metrics");

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      where: {
        classId: req.params.classId,
      },
      include: [
        {
          model: Metrics,
        },
      ],
    });
    res.send(sessions);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({
      where: {
        classId: req.params.classId,
        sessionId: req.params.sessionId,
      },
      include: [
        {
          model: Metrics,
        },
      ],
    });
    if (session) {
      res.send(session);
    } else {
      res.status(404).send({
        message: "Session not found with the specified classId and sessionId",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};

exports.createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await Session.findByPk(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    await session.update(req.body);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await Session.findByPk(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    await session.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMetrics = async (req, res) => {
  const { sessionId } = req.params;
  const { stickiness, correctness, attendance, improvement } = req.body;

  try {
    const session = await Session.findByPk(sessionId, {
      include: [
        {
          model: Metrics,
        },
      ],
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.Metrics) {
      session.Metrics.stickiness = stickiness;
      session.Metrics.correctness = correctness;
      session.Metrics.attendance = attendance;
      session.Metrics.improvement = improvement;
      await session.Metrics.save();
    } else {
      const metrics = await Metrics.create({
        sessionId,
        stickiness,
        correctness,
        attendance,
        improvement,
      });
      session.metricsId = metrics.metricsId;
      await session.save();
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
