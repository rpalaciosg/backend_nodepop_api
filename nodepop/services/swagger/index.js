const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "nodepop API",
      version: "1.1.0",
      description: "API de anuncios publicados",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["../../routes/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = specs;
