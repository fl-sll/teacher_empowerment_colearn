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