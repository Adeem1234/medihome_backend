const Router = require('express-promise-router')();
const Pharmacist = require('../../controller/web/admin/pharmacist');
const {
    ensureAuthenticated
} = require('../../config/auth');

Router.route('/pharmacies').get(ensureAuthenticated, Pharmacist.get);
Router.route('/pharmacy/add').get(ensureAuthenticated, Pharmacist.show).post(ensureAuthenticated, Pharmacist.add);
Router.route('/pharmacy/edit/:id').get(ensureAuthenticated, Pharmacist.edit).post(ensureAuthenticated, Pharmacist.update);
Router.route('/pharmacy/delete/:id').get(ensureAuthenticated, Pharmacist.delete);

module.exports = Router;