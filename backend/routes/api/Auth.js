const Router = require('express-promise-router')();
const AuthController = require('../../controller/api/Auth');
const { loginValidation, appleLoginValidation } = require('../../middlewares/verification');

Router.route('/login').post(AuthController.login);
Router.route('/register').post(AuthController.register);
// Router.route('/apple/login').post(appleLoginValidation, AuthController.AppleLogin)

module.exports = Router;