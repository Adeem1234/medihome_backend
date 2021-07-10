const Router = require('express-promise-router')();
const UserController = require('../../controller/api/UserController');
const { blockedUserCheck } = require('../../middlewares/userVerification');
const { userNameValidation, callValidation } = require('../../middlewares/verification');

const verifyToken = require('../../middlewares/verifyToken');


Router.route('/add-new/city').post(verifyToken, UserController.addCitynArea);
Router.route('/dashboard').get(verifyToken, UserController.Dashboard)


module.exports = Router;