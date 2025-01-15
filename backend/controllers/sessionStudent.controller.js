const SessionStudent = require("../models/SessionStudent");
const Metrics = require("../models/Metrics");

exports.getAllSessionStudents = async (req, res) => {
  const sessionStudents = await SessionStudent.findAll({
    include: [
      {
        model: Metrics,
      },
    ],
  });
  res.json(sessionStudents);
};

// exports.getAllSessionStudents = async (req, res) => {
//   try {
//     // Fetch all session students along with their related metrics
//     const sessionStudents = await SessionStudent.findAll({
//       include: [
//         {
//           model: Metrics,
//         },
//       ],
//     });

//     // Loop through each sessionStudent to update the improvement
//     for (let sessionStudent of sessionStudents) {
//       const { pretest, posttest, metricsId } = sessionStudent;

//       if (pretest !== undefined && posttest !== undefined) {
//         // Calculate improvement
//         const improvement = (posttest - pretest) / 10;

//         // Find the related Metrics record and update improvement
//         const metrics = await Metrics.findByPk(metricsId);
//         if (metrics) {
//           await metrics.update({ improvement });
//         }
//       }
//     }

//     // Send the updated session students as the response
//     res.json(sessionStudents);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


exports.getSessionStudentById = async (req, res) => {
  const sessionStudent = await SessionStudent.findByPk(req.params.id, {
    include: [
      {
        model: Metrics,
      },
    ],
  });
  if (sessionStudent) {
    // const improvement_data = (sessionStudent.posttest - sessionStudent.pretest) / 10;

    // const metrics = await Metrics.findByPk(sessionStudent.metricsId);
    // if (metrics) {
    //   await metrics.update({ improvement: improvement_data });
    // } else {
    //   return res.status(404).send("Metrics not found");
    // }
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
    include: [
      {
        model: Metrics,
      },
    ],
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
    include: [
      {
        model: Metrics,
      },
    ],
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
  try {
    // Get the session student by ID
    const sessionStudent = await SessionStudent.findByPk(req.params.id);
    if (!sessionStudent) {
      return res.status(404).send("SessionStudent not found");
    }

    // Update the pretest and posttest values from the request body
    const { pretest, posttest } = req.body;

    if (pretest !== undefined || posttest !== undefined) {
      await sessionStudent.update(req.body);

      // If pretest or posttest is updated, calculate the improvement
      if (pretest !== undefined && posttest !== undefined) {
        const improvement = (posttest - pretest) / 10;

        const metrics = await Metrics.findByPk(sessionStudent.metricsId);
        if (metrics) {
          await metrics.update({ improvement });
        } else {
          return res.status(404).send("Metrics not found");
        }
      }

      res.json(sessionStudent);
    } else {
      res.status(400).send("Pretest or posttest must be provided for update.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      include: [
        {
          model: Metrics,
        },
      ],
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
