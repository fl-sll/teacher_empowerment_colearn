const Class = require("../models/Class");
const Course = require("../models/Course");

exports.getAllClasses = async (req, res) => {
  Class.findAll({
    where: {
      courseId: req.params.courseId,
    },
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

exports.createClass = async (req, res) => {
  //   const classInstance = await Class.create(req.body);
  //   res.json(classInstance);

  const classInstance = {
    classId: req.body.classId,
    courseId: req.params.courseId,
    className: req.body.className,
  };

  Class.create(classInstance)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

exports.updateClass = async (req, res) => {
    try {
      const classInstance = await Class.findOne({
      where: 
      { classId: req.params.classId, 
        courseId: req.params.courseId },
    });
  
      if (!classInstance) {
        return res.status(404).send("Class not found");
      }
  
      const { classId, courseId, ...updateData } = req.body;
  
      if (courseId) {
        const courseExists = await Course.findByPk(req.params.courseId);
  
        if (!courseExists) {
          return res.status(400).send("Invalid courseId: Course does not exist");
        }
  
        // Add courseId to updateData
        // updateData.courseId = courseId || req.params.courseId;
      }
  
      // Update class data (excluding the primary key)
      await classInstance.update(updateData, { fields: Object.keys(updateData) });

      res.json(classInstance);
    } catch (error) {
      console.error("Error updating class:", error);
      res.status(500).send("An error occurred while updating the class.");
    }
  };

exports.deleteClass = async (req, res) => {
  const classInstance = await Class.findByPk(req.params.classId);
  if (classInstance) {
    await classInstance.destroy();
    res.send("Class deleted");
  } else {
    res.status(404).send("Class not found");
  }
};
