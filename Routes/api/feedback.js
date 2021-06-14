const Router = require('express-promise-router')();
const FeedbackController = require('../../controller/api/feedback');
const { FeedbackValidation } = require('../../middlewares/verification');

const verifyToken = require('../../middlewares/verifyToken');

Router.route('/save-feedback').post([verifyToken, FeedbackValidation], FeedbackController.saveFeedback);
Router.route('/get-feedback').get(FeedbackController.getFeedbackQuestion);

module.exports = Router;