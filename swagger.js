const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Smash API',
    version: '1.0.0',
    description: 'API documentation for Smash API',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./app.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
