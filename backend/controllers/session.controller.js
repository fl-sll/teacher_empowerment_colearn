const Session = require("../models/Session");

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      where: {
        classId: req.params.classId,
      },
    });

    if (sessions.length === 0) {
      return res.status(404).send({
        message: `No sessions found for classId: ${req.params.classId}`,
      });
    }

    res.send(sessions);
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving sessions.",
    });
  }
};

exports.getSessionById = async (req, res) => {
  const session = await Session.findByPk(req.params.sessionId);
  if (session) {
    res.json(session);
  } else {
    res.status(404).send("Session not found");
  }
};

exports.createSession = async (req, res) => {
  const sessionInstance = {
    sessionId: req.body.sessionId,
    classId: req.body.classId,
    date: req.body.date,
    stickiness: req.body.stickiness,
    correctness: req.body.correctness,
    attendance: req.body.attendance,
  };

  Session.create(sessionInstance)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
  //   res.json(sessionInstance);
};

exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findOne({
      where: {
        sessionId: req.params.sessionId,
        classId: req.params.classId,
      },
    });
    if (!session) {
      return res.status(404).send("Session not found");
    }

    const { sessionId, classId, ...updatedData } = req.body;

    await session.update(updatedData, { fields: Object.keys(updatedData) });
    res.json(session);
  } catch (error) {
    console.log("Error updating session: ", error);
    res.status(500).send("An error occurred while updating the session.");
    // If we want to send the clear error message to user
    // res.status(500).send(error.parent.sqlMessage);
  }
};

exports.deleteSession = async (req, res) => {
  const session = await Session.findByPk(req.params.sessionId);
  if (session) {
    await session.destroy();
    res.send(`${session.sessionId} deleted`);
  } else {
    res.status(404).send("Session not found");
  }
};

exports.updateMetrics = async (req, res) => {
  const { sessionId } = req.params;
  const { stickiness, correctness, attendance } = req.body;

  try {
      const session = await Session.findByPk(sessionId);
      if (!session) {
          return res.status(404).json({ message: 'Session not found' });
      }

      session.stickiness = stickiness;
      session.correctness = correctness;
      session.attendance = attendance;

      await session.save();
      res.status(200).json(session);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};