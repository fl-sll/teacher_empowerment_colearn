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
