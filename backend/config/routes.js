/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /orders': 'orders/create',
  'GET /orders/:id': 'orders/find-one',
  'GET /orders': 'orders/find-all',
  'GET /swagger.json': 'swagger/view',
};
