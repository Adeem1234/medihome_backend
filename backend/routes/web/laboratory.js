const Router = require('express-promise-router')();
const LaboratoryController = require('../../controller/web/LaboratoryController');
const LaboratoryOrderController = require('../../controller/web/LaboratoryOrderController');

const {
  ensureAuthenticated
} = require('../../config/auth');

Router.route('/laboratories').get(ensureAuthenticated, LaboratoryController.get);
Router.route('/laboratory/add').get(ensureAuthenticated, LaboratoryController.show).post(ensureAuthenticated, LaboratoryController.add);
Router.route('/laboratory/edit/:id').get(ensureAuthenticated, LaboratoryController.edit).post(ensureAuthenticated, LaboratoryController.update);
Router.route('/laboratory/delete/:id').get(ensureAuthenticated, LaboratoryController.delete);


Router.route('/laboratory/orders/status/processing/:id').get(ensureAuthenticated, LaboratoryOrderController.updateOrderStatusProcessing)
Router.route('/laboratory/orders/status/completed/:id').get(ensureAuthenticated, LaboratoryOrderController.updateOrderStatusCompleted)
Router.route('/laboratory/orders').get(ensureAuthenticated, LaboratoryOrderController.getOrders)


module.exports = Router;