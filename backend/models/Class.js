const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Course = require("./Course");

const Class = sequelize.define("Class", {
  classId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  courseId: {
    type: DataTypes.STRING,
    references: {
      model: Course,
      key: "courseId",
    },
  },
  className: {
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

module.exports = Class;
