module.exports = {

  tableName: 'orders',

  attributes: {

    id: {
      type: 'number',
      autoIncrement: true
    },

    totalPrice: {
      type: 'number',
      defaultsTo: 0,
      description: 'Valor total do pedido.'
    },

    totalTime: {
      type: 'number',
      defaultsTo: 0,
      description: 'Tempo total de preparo do pedido (em minutos).'
    },

    pizzas: {
      collection: 'pizza',
      via: 'order'
    }
  },

  primaryKey: 'id'
};
