const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Student = sequelize.define('Student', {
    studentId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    studentName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stickiness: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    attendance: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    pretest: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    posttest: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    correctness: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    improvement: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});

module.exports = Student;