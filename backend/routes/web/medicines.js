const Router = require('express-promise-router')();
const MedicinesController = require('../../controller/web/MedicinesController');
const {
  ensureAuthenticated
} = require('../../config/auth');

Router.route('/medicines').get(ensureAuthenticated, MedicinesController.index);
Router.route('/medicine/add').get(ensureAuthenticated, MedicinesController.add).post(ensureAuthenticated, MedicinesController.create);
Router.route('/medicine/edit/:id').get(ensureAuthenticated, MedicinesController.edit).post(ensureAuthenticated, MedicinesController.update);
Router.route('/medicine/delete/:id').get(ensureAuthenticated, MedicinesController.delete);

module.exports = Router;