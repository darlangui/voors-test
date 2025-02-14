/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieves a list of all pizza orders.
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   totalPrice:
 *                     type: number
 *                   totalTime:
 *                     type: number
 *                   pizzas:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         size:
 *                           type: string
 *                           enum: [pequena, média, grande]
 *                         flavor:
 *                           type: string
 *                           enum: [calabresa, marguerita, portuguesa]
 *                         personalizations:
 *                           type: array
 *                           items:
 *                             type: string
 *                             enum: [extra bacon, sem cebola, borda recheada]
 */
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
