const Router = require('express-promise-router')();
const Setting = require('../../controller/web/setting');
const {
    ensureAuthenticated
} = require('../../config/auth');

Router.route('/settings').get(ensureAuthenticated, Setting.show).post(ensureAuthenticated, Setting.save);

module.exports = Router;