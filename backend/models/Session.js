const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Class = require('./Class');

const Session = sequelize.define('Session', {
    sessionId: {
        type: DataTypes.STRING,
        primaryKey: true
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
    stickiness: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    correctness: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    attendance: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});

module.exports = Session;