const swaggerJsdoc = require('swagger-jsdoc');

module.exports = async function (req, res) {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: sails.config.swagger.info,
      servers: sails.config.swagger.servers,
    },
    apis: sails.config.swagger.apis,
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  return res.send(swaggerSpec);
};
