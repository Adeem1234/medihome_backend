const Router = require('express-promise-router')();
const AuthController = require('../../controller/api/Auth');
const { loginValidation, appleLoginValidation } = require('../../middlewares/verification');

Router.route('/login').post(loginValidation, AuthController.login);
Router.route('/apple/login').post(appleLoginValidation, AuthController.AppleLogin)

module.exports = Router;