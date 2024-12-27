const { Sequalize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Course = sequelize.define("Course", {
  courseId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stickiness: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  correctness: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  attendance: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = Course;
