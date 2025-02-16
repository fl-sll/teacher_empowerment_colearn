/**
 * @file Session.js
 * @description Model file for defining the Session entity in the Teacher Empowerment API.
 * @version 1.0.0
 * @date 2025-01-05
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines the Session model and its associations with the Class and Metrics models.
 * It uses Sequelize ORM to define the schema and relationships.
 */

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Class = require('./Class');
const Metrics = require("./Metrics");

const Session = sequelize.define('Session', {
    sessionId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    sessionName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classId: {
        type: DataTypes.STRING,
        references: {
            model: Class,
            key: 'classId'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
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

Session.hasOne(Metrics, { foreignKey: 'sessionId' });
Metrics.belongsTo(Session, { foreignKey: 'sessionId' });

module.exports = Session;