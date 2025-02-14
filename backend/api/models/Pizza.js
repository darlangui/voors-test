module.exports = {

  tableName: 'pizzas',

  attributes: {

    id: {
      type: 'number',
      autoIncrement: true
    },

    size: {
      type: 'string',
      isIn: ['pequena', 'média', 'grande'],
      required: true,
      description: 'Tamanho da pizza (pequena, média ou grande).'
    },

    flavor: {
      type: 'string',
      isIn: ['calabresa', 'marguerita', 'portuguesa'],
      required: true,
      description: 'Sabor da pizza.'
    },

    personalizations: {
      type: 'json',
      description: 'Array com as personalizações (strings).',
      defaultsTo: []
    },

    order: {
      model: 'order',
      description: 'ID do pedido ao qual essa pizza pertence.'
    }
  },

  primaryKey: 'id'
};
