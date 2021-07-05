const Router = require('express-promise-router')();
const AuthController = require('../../controller/api/AuthController');
const { loginValidation, appleLoginValidation } = require('../../middlewares/verification');

Router.route('/user/login').post(AuthController.login);
Router.route('/user/register').post(AuthController.register);

module.exports = Router;