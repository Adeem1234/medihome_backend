const Router = require('express-promise-router')();
const DashboardController = require('../../controller/web/DashboardController');
const {
  ensureAuthenticated
} = require('../../config/auth');

// Home Page Dashboard Page
Router.route('/').get(ensureAuthenticated, DashboardController.index);
// Dashboard
Router.route('/dashboard').get(ensureAuthenticated, DashboardController.index);

module.exports = Router;