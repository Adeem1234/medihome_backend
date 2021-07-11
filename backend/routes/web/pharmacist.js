const Router = require('express-promise-router')();
const PharmacistsController = require('../../controller/web/PharmacistsController');
const {
    ensureAuthenticated
} = require('../../config/auth');

const PharmacyOrderController = require('../../controller/web/PharmacyOrderController');

Router.route('/pharmacies').get(ensureAuthenticated, PharmacistsController.get);
Router.route('/pharmacy/add').get(ensureAuthenticated, PharmacistsController.show).post(ensureAuthenticated, PharmacistsController.add);
Router.route('/pharmacy/edit/:id').get(ensureAuthenticated, PharmacistsController.edit).post(ensureAuthenticated, PharmacistsController.update);
Router.route('/pharmacy/delete/:id').get(ensureAuthenticated, PharmacistsController.delete);
Router.route('/pharmacy/add/medicine').get(ensureAuthenticated, PharmacistsController.medicines).post(ensureAuthenticated, PharmacistsController.updateStock)

Router.route('/pharmacy/orders/status/processing/:id').get(ensureAuthenticated, PharmacyOrderController.updateOrderStatusProcessing)
Router.route('/pharmacy/orders/status/completed/:id').get(ensureAuthenticated, PharmacyOrderController.updateOrderStatusCompleted)
Router.route('/pharmacy/orders').get(ensureAuthenticated, PharmacyOrderController.getOrders);
// Router.route('/pharamcy/get-city-area').get(ensureAuthenticated,)

module.exports = Router;