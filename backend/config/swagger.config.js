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
            metricId: {
              type: "number",
              description: "The ID of the metric",
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
            metricId: {
              type: "number",
              description: "The ID of the metric",
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
            metricId: {
              type: "number",
              description: "The ID of the metric",
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
            metricId: {
              type: "number",
              description: "The ID of the metric",
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
            metricId: {
              type: "number",
              description: "The ID of the metric",
            }
          },
        },
        Metrics: {
          type: "object",
          required: ["stickiness", "correctness", "attendance", "improvement"],
          properties: {
            stickiness: {
              type: "number",
              description: "The stickiness metric",
            },
            correctness: {
              type: "number",
              description: "The correctness metric",
            },
            attendance: {
              type: "number",
              description: "The attendance metric",
            },
            improvement: {
              type: "string",
              description: "The improvement metric",
            },
          },
        }
      },
    },
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;
