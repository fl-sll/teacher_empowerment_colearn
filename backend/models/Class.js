const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Course = require("./Course");
const Metrics = require("./Metrics");

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
  metricsId: {
    type: DataTypes.INTEGER,
    references: {
      model: Metrics,
      key: "metricsId",
    },
    allowNull: false
  },
});

Class.hasOne(Metrics, { foreignKey: 'classId' });
Metrics.belongsTo(Class, { foreignKey: 'classId' });

module.exports = Class;
