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