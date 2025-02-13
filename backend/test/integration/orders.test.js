const request = require('supertest');
const Sails = require('sails');

let sailsApp;

describe('Orders API Tests', () => {
  beforeAll((done) => {
    Sails.lift(
      {
        port: 9999,
        hookTimeout: 90000,
        environment: 'test',

        datastores: {
          default: {
            adapter: 'sails-disk',
            inMemoryOnly: true
          },
        },

        log: { level: 'error' },
      },
      (err, _sails) => {
        if (err) {return done(err);}
        sailsApp = _sails;
        return done();
      }
    );
  });

  afterAll((done) => {
    if (sailsApp) {
      return Sails.lower(done);
    }
    return done();
  });

  // =============== TESTE 1: Criar um Pedido ===============
  describe('POST /orders', () => {
    it('Deve criar um novo pedido e retornar o objeto populado', async () => {
      const response = await request(sailsApp.hooks.http.app)
        .post('/orders')
        .send({
          pizzas: [
            {
              size: 'média',
              flavor: 'portuguesa',
              personalizations: ['borda recheada'],
            },
            {
              size: 'pequena',
              flavor: 'calabresa',
              personalizations: ['extra bacon'],
            },
          ],
        })
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('totalPrice');
      expect(response.body).toHaveProperty('totalTime');
      expect(response.body).toHaveProperty('pizzas');
      expect(Array.isArray(response.body.pizzas)).toBe(true);

      expect(response.body.pizzas.length).toBe(2);
    });
  });

  // =============== TESTE 2: Buscar Pedido Específico ===============
  describe('GET /orders/:id', () => {
    let createdOrder;

    beforeAll(async () => {
      const res = await request(sailsApp.hooks.http.app)
        .post('/orders')
        .send({
          pizzas: [
            {
              size: 'grande',
              flavor: 'calabresa',
            },
          ],
        });
      createdOrder = res.body;
    });

    it('Deve retornar o pedido criado pelo ID', async () => {
      const response = await request(sailsApp.hooks.http.app)
        .get(`/orders/${createdOrder.id}`)
        .expect(200);

      expect(response.body.id).toBe(createdOrder.id);
      expect(response.body.pizzas).toBeDefined();
      expect(response.body.pizzas.length).toBe(1);
    });

    it('Deve retornar 404 se o pedido não existir', async () => {
      await request(sailsApp.hooks.http.app)
        .get('/orders/78090')
        .expect(404);
    });
  });

  // =============== TESTE 3: Buscar Todos os Pedidos ===============
  describe('GET /orders', () => {
    it('Deve retornar um array de pedidos', async () => {
      const response = await request(sailsApp.hooks.http.app)
        .get('/orders')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });
});
