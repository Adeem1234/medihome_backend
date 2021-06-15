const Router = require('express-promise-router')();
const {
    forwardAuthenticated
} = require('../../middlewares/auth');
const Admin = require('../../controller/web/admin/admin');

//Login Page Route
Router.route('/login').get(forwardAuthenticated, Admin.getLogin).post(forwardAuthenticated, Admin.postLogin);
//register Handle
Router.route('/register').get(forwardAuthenticated, Admin.getRegister).post(forwardAuthenticated, Admin.postRegister);
// Logout
Router.route('/logout').get(Admin.Logout);

module.exports = Router;