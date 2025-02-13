const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = function swaggerUiHook(sails) {
  return {
    initialize: async function (done) {
      const swaggerOptions = {
        definition: {
          openapi: '3.0.0',
          info: sails.config.swagger.info,
          servers: sails.config.swagger.servers,
        },
        apis: sails.config.swagger.apis,
      };

      const swaggerSpec = swaggerJsdoc(swaggerOptions);

      sails.hooks.http.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

      return done();
    },
  };
};
