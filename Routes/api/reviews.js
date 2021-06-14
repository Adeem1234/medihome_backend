const Router = require('express-promise-router')();
const UserController = require('../../controller/api/User');
const { reviewsValidation } = require('../../middlewares/verification');

const verifyToken = require('../../middlewares/verifyToken');

Router.route('/reviews').post([verifyToken, reviewsValidation], UserController.SaveReviews);
Router.route('/get-reviews').post(verifyToken, UserController.GetReviews);

module.exports = Router;