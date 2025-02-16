/**
 * @file setupTests.js
 * @description Setup file for configuring Jest in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2025-01-22
 * authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file sets up Jest for testing, including importing jest-dom for extended assertions and mocking console warnings and errors.
 */

module.exports = {
  preset: "react-app", // if you're using Create React App
  // transform: {
  //   "^.+\\.[t|j]sx?$": "babel-jest", // Use Babel to transform files
  // },
  // transformIgnorePatterns: [
  //   "/node_modules/(?!axios)/", // Allow axios to be transformed
  // ],
  setupFilesAfterEnv: ['/src/setupTests.js'],
  verbose: true,
  testResultsProcessor: "./node_modules/jest-sonar-reporter",
};
