const Router = require('express-promise-router')();
const MedicinesController = require('../../controller/web/admin/MedicinesController');
const {
  ensureAuthenticated
} = require('../../config/auth');

Router.route('/locations').get(ensureAuthenticated, MedicinesController.get);
Router.route('/location/add').get(ensureAuthenticated, MedicinesController.show).post(ensureAuthenticated, MedicinesController.add);
Router.route('/location/edit/:id').get(ensureAuthenticated, MedicinesController.edit).post(ensureAuthenticated, MedicinesController.update);
Router.route('/location/delete/:id').get(ensureAuthenticated, MedicinesController.delete);

module.exports = Router;