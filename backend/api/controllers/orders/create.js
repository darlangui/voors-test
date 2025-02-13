/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new pizza order
 *     description: Receives an array of pizzas, validates them, calculates the total price and time, and stores the order.
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pizzas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                       enum: [pequena, média, grande]
 *                     flavor:
 *                       type: string
 *                       enum: [calabresa, marguerita, portuguesa]
 *                     personalizations:
 *                       type: array
 *                       items:
 *                         type: string
 *                         enum: [extra bacon, sem cebola, borda recheada]
 *     responses:
 *       200:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 */
module.exports = {
  friendlyName: 'Create order',
  description: 'Cria um pedido com múltiplas pizzas e salva no banco.',

  inputs: {
    pizzas: {
      type: 'ref',
      required: true,
      description: 'Array de pizzas para compor o pedido'
    }
  },

  exits: {
    success: {
      description: 'Pedido criado com sucesso.'
    },
    badRequest: {
      description: 'Dados inválidos.'
    }
  },

  fn: async function (inputs, exits) {
    try {
      const { pizzas } = inputs;

      const { totalPrice, totalTime } = await sails.helpers.calculateOrder(pizzas)
        .intercept('invalidData', 'badRequest');

      const newOrder = await Order.create({
        totalPrice,
        totalTime
      }).fetch();

      for (const pizza of pizzas) {
        await Pizza.create({
          size: pizza.size,
          flavor: pizza.flavor,
          personalizations: pizza.personalizations || [],
          order: newOrder.id
        });
      }

      const orderPopulated = await Order
        .findOne({ id: newOrder.id })
        .populate('pizzas');

      return exits.success(orderPopulated);

    } catch (err) {
      return exits.badRequest({
        message: err.message || 'Erro ao criar pedido.'
      });
    }
  }
};
