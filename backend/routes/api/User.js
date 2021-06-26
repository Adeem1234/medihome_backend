const Router = require('express-promise-router')();
const UserController = require('../../controller/api/User');
const { blockedUserCheck } = require('../../middlewares/userVerification');
const { userNameValidation, callValidation } = require('../../middlewares/verification');

const verifyToken = require('../../middlewares/verifyToken');

// Router.route('/check-username').post(userNameValidation, UserController.checkUserName);
// Router.route('/is-searching/:id').get(verifyToken, UserController.isSearching);
// Router.route('/details').get(verifyToken, UserController.mydetails);
// Router.route('/user/details').post([verifyToken, blockedUserCheck], UserController.userDetails);
// Router.route('/settings').get(UserController.settings);

module.exports = Router;