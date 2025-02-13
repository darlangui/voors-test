/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     description: Retrieves a specific pizza order by its unique ID.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the order
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 totalPrice:
 *                   type: number
 *                 totalTime:
 *                   type: number
 *                 pizzas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       size:
 *                         type: string
 *                         enum: [pequena, média, grande]
 *                       flavor:
 *                         type: string
 *                         enum: [calabresa, marguerita, portuguesa]
 *                       personalizations:
 *                         type: array
 *                         items:
 *                           type: string
 *                           enum: [extra bacon, sem cebola, borda recheada]
 *       404:
 *         description: Order not found
 */
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
      description: 'Nenhum pedido com esse ID foi encontrado.',
      responseType: 'notFound'
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
