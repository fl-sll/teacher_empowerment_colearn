/**
 * @file Student.js
 * @description Model file for defining the Student entity in the Teacher Empowerment API.
 * @version 1.0.0
 * @date 2025-01-02
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the Student model and its associations with the Metrics model.
 * It uses Sequelize ORM to define the schema and relationships.
 */

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Metrics = require("./Metrics");

const Student = sequelize.define('Student', {
    studentId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    studentName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    metricsId: {
        type: DataTypes.INTEGER,
        references: {
          model: Metrics,
          key: "metricsId",
        },
        allowNull: false
    }
});

Student.hasOne(Metrics, { foreignKey: 'studentId' });
Metrics.belongsTo(Student, { foreignKey: 'studentId' });

module.exports = Student;