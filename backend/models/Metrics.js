/**
 * @file Metrics.js
 * @description Model file for defining the Metrics entity in the Teacher Empowerment API.
 * @version 1.0.0
 * @date 2025-01-15
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the Metrics model and its associations with other models.
 * It uses Sequelize ORM to define the schema and relationships.
 */

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Metrics = sequelize.define('Metrics', {
    metricsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    stickiness: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    avgTimeSpent: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    attendanceOver30Mins: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    attendance: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    attendanceRate: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    correctness: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    improvement: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
});

module.exports = Metrics;