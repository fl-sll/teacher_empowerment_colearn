require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");

const port = process.env.BE_PORT;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Teacher Empowerment API",
      version: "1.0.0",
      description: "API documentation for the Teacher Empowerment project",
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
    components: {
      schemas: {
        Course: {
          type: "object",
          required: ["courseId", "courseName"],
          properties: {
            courseId: {
              type: "string",
              description: "The course ID",
            },
            courseName: {
              type: "string",
              description: "The name of the course",
            },
            metricsId: {
              type: "number",
              description: "The ID of the metrics",
            },
          },
        },
        Class: {
          type: "object",
          required: ["classId", "courseId", "className"],
          properties: {
            classId: {
              type: "string",
              description: "The class ID",
            },
            courseId: {
              type: "string",
              description: "The ID of the course this class belongs to",
            },
            className: {
              type: "string",
              description: "The name of the class",
            },
            metricsId: {
              type: "number",
              description: "The ID of the metrics",
            },
          },
        },
        Session: {
          type: "object",
          required: ["sessionId", "classId", "date"],
          properties: {
            sessionId: {
              type: "string",
              description: "The session ID",
            },
            classId: {
              type: "string",
              description: "The ID of the class this session belongs to",
            },
            date: {
              type: "string",
              format: "date",
              description: "The date of the session",
            },
            metricsId: {
              type: "number",
              description: "The ID of the metrics",
            },
          },
        },
        Student: {
          type: "object",
          required: ["studentId", "studentName"],
          properties: {
            studentId: {
              type: "string",
              description: "The student ID",
            },
            studentName: {
              type: "string",
              description: "The name of the student",
            },
            metricsId: {
              type: "number",
              description: "The ID of the metrics",
            }
          },
        },
        SessionStudent: {
          type: "object",
          required: ["sessionId", "studentId"],
          properties: {
            sessionId: {
              type: "string",
              description: "The ID of the session",
            },
            studentId: {
              type: "string",
              description: "The ID of the student",
            },
            metricsId: {
              type: "number",
              description: "The ID of the metrics",
            },
            pretest: {
              type: "integer",
              description: "The pretest score of the student",
            },
            posttest: {
              type: "integer",
              description: "The posttest score of the student",
            },
          },
        },
        Metrics: {
          type: "object",
          required: [
            "metricsId",
            "stickiness",
            "avgTimeSpent",
            "attendanceOver30Mins",
            "attendance",
            "correctness",
            "improvement",
          ],
          properties: {
            metricsId: {
              type: "integer",
              description: "The unique identifier for the metrics (primary key)",
            },
            stickiness: {
              type: "number",
              format: "float",
              description: "The stickiness metrics",
            },
            avgTimeSpent: {
              type: "number",
              format: "float",
              description: "The average time spent on activities",
            },
            attendanceOver30Mins: {
              type: "number",
              format: "float",
              description:
                "Percentage of sessions attended for over 30 minutes",
            },
            attendance: {
              type: "integer",
              description: "The attendance count",
            },
            correctness: {
              type: "number",
              format: "float",
              description: "The correctness metrics",
            },
            improvement: {
              type: "string",
              description: "The improvement metrics as a qualitative descriptor",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;
