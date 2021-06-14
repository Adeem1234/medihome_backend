const Router = require('express-promise-router')();
const Dashboard = require('../../controller/web/dashboard');
const {
    ensureAuthenticated
} = require('../../MiddleWares/auth');

// Home Page Dashboard Page
Router.route('/').get(ensureAuthenticated, Dashboard.index);
// Dashboard
Router.route('/dashboard').get(ensureAuthenticated, Dashboard.index);

module.exports = Router;