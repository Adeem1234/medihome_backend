const Router = require('express-promise-router')();
const { showSuggestedQuestions } = require('../../controller/api/suggestedQuestion');
const verifyToken = require('../../middlewares/verifyToken');

Router.route('/suggested-question').get(verifyToken, showSuggestedQuestions);

module.exports = Router;