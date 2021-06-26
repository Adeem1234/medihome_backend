const Router = require('express-promise-router')();
const LaboratoryController = require('../../controller/web/admin/laboratory');
const {
  ensureAuthenticated
} = require('../../config/auth');

Router.route('/laboratories').get(ensureAuthenticated, LaboratoryController.get);
Router.route('/laboratory/add').get(ensureAuthenticated, LaboratoryController.show).post(ensureAuthenticated, LaboratoryController.add);
Router.route('/laboratory/edit/:id').get(ensureAuthenticated, LaboratoryController.edit).post(ensureAuthenticated, LaboratoryController.update);
Router.route('/laboratory/delete/:id').get(ensureAuthenticated, LaboratoryController.delete);

module.exports = Router;