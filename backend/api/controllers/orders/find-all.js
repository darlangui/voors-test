module.exports = {
  friendlyName: 'Find all orders',
  description: 'Retorna todos os pedidos cadastrados, populando as pizzas.',

  inputs: {},

  exits: {
    success: {
      description: 'Retorna a lista de todos os pedidos.'
    }
  },

  fn: async function (inputs, exits) {
    const allOrders = await Order.find().populate('pizzas');
    return exits.success(allOrders);
  }
};
