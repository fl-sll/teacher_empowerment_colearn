/**
 * @file SessionStudent.js
 * @description Model file for defining the SessionStudent entity in the Teacher Empowerment API.
 * @version 1.0.0
 * @date 2025-01-02
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the SessionStudent model and its associations with the Session, Student, and Metrics models.
 * It uses Sequelize ORM to define the schema and relationships.
 */

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Session = require('./Session');
const Student = require('./Student');
const Metrics = require("./Metrics");

const SessionStudent = sequelize.define('SessionStudent', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sessionId: {
        type: DataTypes.STRING,
        references: {
            model: Session,
            key: 'sessionId'
        }
    },
    studentId: {
        type: DataTypes.STRING,
        references: {
            model: Student,
            key: 'studentId'
        }
    },
    metricsId: {
        type: DataTypes.INTEGER,
        references: {
          model: Metrics,
          key: "metricsId",
        },
        allowNull: false
    },
    pretest: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    posttest: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});

SessionStudent.hasOne(Metrics, { foreignKey: 'id' });
Metrics.belongsTo(SessionStudent, { foreignKey: 'id' });

module.exports = SessionStudent;