const { Sequalize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Metrics = require("./Metrics");

const Course = sequelize.define("Course", {
  courseId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  metricsId: {
    type: DataTypes.INTEGER,
    references: {
      model: Metrics,
      key: "metricsId",
    }
  },
});

module.exports = Course;
