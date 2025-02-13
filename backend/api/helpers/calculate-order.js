module.exports = {
  friendlyName: 'Calculate and validate order',
  description: 'Valida um array de pizzas e calcula total de preço/tempo.',

  inputs: {
    pizzas: {
      type: 'ref',
      required: true,
      description: 'Array de pizzas a serem calculadas.'
    }
  },

  exits: {
    success: {
      description: 'Retorna o totalPrice e totalTime calculados.'
    },
    invalidData: {
      description: 'Há algum campo inválido (size, flavor, personalizations).'
    }
  },

  fn: async function (inputs, exits) {
    const { pizzas } = inputs;

    if (!Array.isArray(pizzas) || pizzas.length === 0) {
      return exits.invalidData({ error: 'Array de pizzas vazio ou inválido.' });
    }

    let totalPrice = 0;
    let totalTime = 0;

    for (const pizza of pizzas) {
      if (!['pequena', 'média', 'grande'].includes(pizza.size)) {
        return exits.invalidData({ error: `Tamanho inválido: ${pizza.size}` });
      }

      switch (pizza.size) {
        case 'pequena':
          totalPrice += 20.20;
          totalTime += 15;
          break;
        case 'média':
          totalPrice += 30.30;
          totalTime += 20;
          break;
        case 'grande':
          totalPrice += 40.00;
          totalTime += 25;
          break;
      }

      if (!['calabresa', 'marguerita', 'portuguesa'].includes(pizza.flavor)) {
        return exits.invalidData({ error: `Sabor inválido: ${pizza.flavor}` });
      }
      if (pizza.flavor === 'portuguesa') {
        totalTime += 5;
      }

      if (pizza.personalizations && Array.isArray(pizza.personalizations)) {
        for (const pers of pizza.personalizations) {
          switch (pers) {
            case 'extra bacon':
              totalPrice += 3.00;
              break;
            case 'borda recheada':
              totalPrice += 5.00;
              totalTime += 5;
              break;
            case 'sem cebola':
              break;
            default:
              return exits.invalidData({ error: `Personalização inválida: ${pers}` });
          }
        }
      }
    }

    return exits.success({ totalPrice, totalTime });
  }
};
