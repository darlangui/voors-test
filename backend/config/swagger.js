module.exports.swagger = {
  info: {
    title: 'Pizza Order API',
    description: 'API for ordering and customizing pizzas.',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:1337',
      description: 'Development Server',
    },
  ],
  apis: ['api/controllers/**/*.js'],
};
