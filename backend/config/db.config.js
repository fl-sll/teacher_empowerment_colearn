/**
 * @file db.config.js
 * @description Configuration file for setting up the database connection using Sequelize.
 * @version 1.0.0
 * @date 2024-12-30
 * @authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file contains the configuration settings for connecting to the database.
 * It uses environment variables to configure the database connection details.
 * The Sequelize ORM is used to manage the database connection and pooling.
 */

require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log("Connecting to database with the following details:");
console.log(`DB_NAME: ${process.env.DB_NAME}`);
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_HOST: ${process.env.DB_HOST}`);
console.log(`DB_PORT: ${process.env.DB_PORT}`);
console.log(`DB_DIALECT: ${process.env.DB_DIALECT}`);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false, // Disable logging; default: console.log
    pool: {
      max: 5, // Maximum number of connections in pool
      min: 0, // Minimum number of connections in pool
      acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released
    },
  }
);

module.exports = sequelize;
