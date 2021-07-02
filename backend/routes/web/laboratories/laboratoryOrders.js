const Router = require('express-promise-router')();
const LaboratoryOrderController = require('../../../controller/web/LaboratoryOrderController');
const {
  ensureAuthenticated
} = require('../../../config/auth');

Router.route('/laboratory/orders/status/processing/:id').get(ensureAuthenticated, LaboratoryOrderController.updateOrderStatusProcessing)
Router.route('/laboratory/orders/status/completed/:id').get(ensureAuthenticated, LaboratoryOrderController.updateOrderStatusCompleted)

module.exports = Router;