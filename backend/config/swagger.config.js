const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Teacher Empowerment API',
            version: '1.0.0',
            description: 'API documentation for the Teacher Empowerment project',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            schemas: {
                Course: {
                    type: 'object',
                    required: ['courseId', 'courseName'],
                    properties: {
                        courseId: {
                            type: 'string',
                            description: 'The course ID',
                        },
                        courseName: {
                            type: 'string',
                            description: 'The name of the course',
                        },
                        stickiness: {
                            type: 'number',
                            description: 'The stickiness metric of the course',
                        },
                        correctness: {
                            type: 'number',
                            description: 'The correctness metric of the course',
                        },
                        attendance: {
                            type: 'number',
                            description: 'The attendance metric of the course',
                        },
                    },
                },
                Class: {
                    type: 'object',
                    required: ['classId', 'courseId', 'className'],
                    properties: {
                        classId: {
                            type: 'string',
                            description: 'The class ID',
                        },
                        courseId: {
                            type: 'string',
                            description: 'The ID of the course this class belongs to',
                        },
                        className: {
                            type: 'string',
                            description: 'The name of the class',
                        },
                        stickiness: {
                            type: 'number',
                            description: 'The stickiness metric of the class',
                        },
                        correctness: {
                            type: 'number',
                            description: 'The correctness metric of the class',
                        },
                        attendance: {
                            type: 'number',
                            description: 'The attendance metric of the class',
                        },
                    },
                },
                Session: {
                    type: 'object',
                    required: ['sessionId', 'classId', 'date'],
                    properties: {
                        sessionId: {
                            type: 'string',
                            description: 'The session ID',
                        },
                        classId: {
                            type: 'string',
                            description: 'The ID of the class this session belongs to',
                        },
                        date: {
                            type: 'string',
                            format: 'date',
                            description: 'The date of the session',
                        },
                        stickiness: {
                            type: 'number',
                            description: 'The stickiness metric of the session',
                        },
                        correctness: {
                            type: 'number',
                            description: 'The correctness metric of the session',
                        },
                        attendance: {
                            type: 'number',
                            description: 'The attendance metric of the session',
                        },
                    },
                },
                Student: {
                    type: 'object',
                    required: ['studentId', 'studentName'],
                    properties: {
                        studentId: {
                            type: 'string',
                            description: 'The student ID',
                        },
                        studentName: {
                            type: 'string',
                            description: 'The name of the student',
                        },
                        stickiness: {
                            type: 'number',
                            description: 'The stickiness metric of the student',
                        },
                        attendance: {
                            type: 'number',
                            description: 'The attendance metric of the student',
                        },
                        pretest: {
                            type: 'integer',
                            description: 'The pretest score of the student',
                        },
                        posttest: {
                            type: 'integer',
                            description: 'The posttest score of the student',
                        },
                        correctness: {
                            type: 'number',
                            description: 'The correctness metric of the student',
                        },
                        improvement: {
                            type: 'number',
                            description: 'The improvement metric of the student',
                        },
                    },
                },
                SessionStudent: {
                    type: 'object',
                    required: ['sessionId', 'studentId'],
                    properties: {
                        sessionId: {
                            type: 'string',
                            description: 'The ID of the session',
                        },
                        studentId: {
                            type: 'string',
                            description: 'The ID of the student',
                        },
                        stickiness: {
                            type: 'number',
                            description: 'The stickiness metric of the student in the session',
                        },
                        attendance: {
                            type: 'number',
                            description: 'The attendance metric of the student in the session',
                        },
                        correctness: {
                            type: 'number',
                            description: 'The correctness metric of the student in the session',
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;