const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Session = require('./Session');
const Student = require('./Student');

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
    stickiness: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    attendance: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    correctness: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});

module.exports = SessionStudent;