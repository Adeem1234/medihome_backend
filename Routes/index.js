const Router = require('express-promise-router')();
const {
    ensureAuthenticated
} = require('../middlewares/auth');
const Admin = require('../controller/web/admin/admin');
const Dashbaord = require('../controller/web/dashboard');

Router.route('/').get(ensureAuthenticated, Dashbaord.index);

module.exports = Router;