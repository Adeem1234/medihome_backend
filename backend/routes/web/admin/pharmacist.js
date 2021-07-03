const Router = require('express-promise-router')();
const PharmacistsController = require('../../../controller/web/PharmacistsController');
const {
    ensureAuthenticated
} = require('../../../config/auth');

Router.route('/pharmacies').get(ensureAuthenticated, PharmacistsController.get);
Router.route('/pharmacy/add').get(ensureAuthenticated, PharmacistsController.show).post(ensureAuthenticated, PharmacistsController.add);
Router.route('/pharmacy/edit/:id').get(ensureAuthenticated, PharmacistsController.edit).post(ensureAuthenticated, PharmacistsController.update);
Router.route('/pharmacy/delete/:id').get(ensureAuthenticated, PharmacistsController.delete);
Router.route('/pharamcy/get-city-area').get(ensureAuthenticated, )

module.exports = Router;