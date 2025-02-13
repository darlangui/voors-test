module.exports = {
  friendlyName: 'Find one order',
  description: 'Busca um pedido específico pelo ID.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'ID do pedido a ser buscado'
    }
  },

  exits: {
    success: {
      description: 'Retorna o pedido encontrado.'
    },
    notFound: {
      description: 'Nenhum pedido com esse ID foi encontrado.'
    }
  },

  fn: async function (inputs, exits) {
    const { id } = inputs;

    const order = await Order.findOne({ id }).populate('pizzas');

    if (!order) {
      return exits.notFound({ error: `Pedido com ID ${id} não encontrado.` });
    }

    return exits.success(order);
  }
};
