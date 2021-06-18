const Router = require('express-promise-router')();
const DocotorController = require('../../controller/web/admin/doctor');
const {
  ensureAuthenticated
} = require('../../config/auth');

Router.route('/doctors').get(ensureAuthenticated, DocotorController.get);
Router.route('/doctor/add').get(ensureAuthenticated, DocotorController.show).post(ensureAuthenticated, DocotorController.add);
Router.route('/doctor/edit/:id').get(ensureAuthenticated, DocotorController.edit).post(ensureAuthenticated, DocotorController.update);
Router.route('/doctor/delete/:id').get(ensureAuthenticated, DocotorController.delete);

module.exports = Router;