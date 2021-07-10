const Router = require('express-promise-router')();
const PharmacyOrderController = require('../../../controller/web/PharmacyOrderController');
const {
  ensureAuthenticated
} = require('../../../config/auth');

Router.route('/pharmacy/orders/status/processing/:id').get(ensureAuthenticated, PharmacyOrderController.updateOrderStatusProcessing)
Router.route('/pharmacy/orders/status/completed/:id').get(ensureAuthenticated, PharmacyOrderController.updateOrderStatusCompleted)
Router.route('/pharmacy/orders').get(ensureAuthenticated, PharmacyOrderController.getOrders)

module.exports = Router;