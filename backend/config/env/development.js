module.exports = {
  port: 1337,
  environment: 'development',
  datastores: {
    default: {
      adapter: 'sails-mysql',
      url: 'mysql://tester:test@localhost:3306/teste_tecnico'
    }
  }
};
