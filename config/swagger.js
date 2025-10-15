const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJS Posts API',
      version: '1.0.0',
      description: 'API documentation for Posts service',
    },
    servers: [
      {
        url: `${process.env.BASE_URL}`,
        description: 'Demo server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
