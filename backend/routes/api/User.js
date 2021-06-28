const Router = require('express-promise-router')();
const UserController = require('../../controller/api/User');
const { blockedUserCheck } = require('../../middlewares/userVerification');
const { userNameValidation, callValidation } = require('../../middlewares/verification');

const verifyToken = require('../../middlewares/verifyToken');


Router.route('/add-new/city').post(verifyToken, UserController.addCitynArea);
Router.route('/update-profile').get(verifyToken, UserController.getUpdateProfile);
Router.route('/update-profile').post(verifyToken, UserController.updateprofile);

module.exports = Router;