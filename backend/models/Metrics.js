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
    correctness: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    improvement: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

module.exports = Metrics;