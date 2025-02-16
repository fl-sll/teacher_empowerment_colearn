/**
 * @file Course.js
 * @description Model file for defining the Course entity in the Teacher Empowerment API.
 * @version 1.0.0
 * @date 2025-01-02
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the Course model and its associations with the Metrics model.
 * It uses Sequelize ORM to define the schema and relationships.
 */

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
    },
    allowNull: false
  },
});

Course.hasOne(Metrics, { foreignKey: 'courseId' });
Metrics.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Course;
