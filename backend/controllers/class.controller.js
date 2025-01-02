const Class = require("../models/Class");
const Course = require("../models/Course");
const Metrics = require("../models/Metrics");

exports.getAllClasses = async (req, res) => {
  Class.findAll({
    where: {
      courseId: req.params.courseId,
    },
    include: Metrics,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

exports.getClassById = async (req, res) => {
  Class.findOne({
    where: {
      courseId: req.params.courseId,
      classId: req.params.classId,
    },
    include: Metrics,
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Class not found with the specified courseId and classId",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

// exports.createClass = async (req, res) => {
//   //   const classInstance = await Class.create(req.body);
//   //   res.json(classInstance);

//   const classInstance = {
//     classId: req.body.classId,
//     courseId: req.params.courseId,
//     className: req.body.className,
//   };

//   Class.create(classInstance)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred",
//       });
//     });
// };

exports.createClass = async (req, res) => {
  try {
    const classInstance = await Class.create(req.body);
    res.status(201).json(classInstance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.updateClass = async (req, res) => {
//     try {
//       const classInstance = await Class.findOne({
//       where: 
//       { classId: req.params.classId, 
//         courseId: req.params.courseId },
//     });
  
//       if (!classInstance) {
//         return res.status(404).send("Class not found");
//       }
  
//       const { classId, courseId, ...updateData } = req.body;
  
//       if (courseId) {
//         const courseExists = await Course.findByPk(req.params.courseId);
  
//         if (!courseExists) {
//           return res.status(400).send("Invalid courseId: Course does not exist");
//         }
  
//         // Add courseId to updateData
//         // updateData.courseId = courseId || req.params.courseId;
//       }
  
//       // Update class data (excluding the primary key)
//       await classInstance.update(updateData, { fields: Object.keys(updateData) });

//       res.json(classInstance);
//     } catch (error) {
//       console.error("Error updating class:", error);
//       res.status(500).send("An error occurred while updating the class.");
//     }
//   };

exports.updateClass = async (req, res) => {
  const { classId } = req.params;
  try {
    const classInstance = await Class.findByPk(classId);
    if (!classInstance) {
      return res.status(404).json({ message: 'Class not found' });
    }
    await classInstance.update(req.body);
    res.status(200).json(classInstance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.deleteClass = async (req, res) => {
//   const classInstance = await Class.findByPk(req.params.classId);
//   if (classInstance) {
//     await classInstance.destroy();
//     res.send("Class deleted");
//   } else {
//     res.status(404).send("Class not found");
//   }
// };

exports.deleteClass = async (req, res) => {
  const { classId } = req.params;
  try {
    const classInstance = await Class.findByPk(classId);
    if (!classInstance) {
      return res.status(404).json({ message: 'Class not found' });
    }
    await classInstance.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMetrics = async (req, res) => {
  const { classId } = req.params;
  const { stickiness, correctness, attendance, improvement } = req.body;

  try {
    const classInstance = await Class.findByPk(classId, {
      include: Metrics,
    });
    if (!classInstance) {
      return res.status(404).json({ message: 'Class not found' });
    }

    if (classInstance.Metrics) {
      classInstance.Metrics.stickiness = stickiness;
      classInstance.Metrics.correctness = correctness;
      classInstance.Metrics.attendance = attendance;
      classInstance.Metrics.improvement = improvement;
      await classInstance.Metrics.save();
    } else {
      const metrics = await Metrics.create({
        classId,
        stickiness,
        correctness,
        attendance,
        improvement
      });
      classInstance.metricsId = metrics.metricsId;
      await classInstance.save();
    }

    res.status(200).json(classInstance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};