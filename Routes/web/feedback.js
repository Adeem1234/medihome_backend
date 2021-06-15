const Router = require('express-promise-router')();
const Feedback = require('../../controller/web/feedback');
const { ensureAuthenticated } = require('../../config/auth');

Router.route('/feedback-question').get(ensureAuthenticated, Feedback.get);
Router.route('/feedback-question/add').get(ensureAuthenticated, Feedback.show).post(ensureAuthenticated, Feedback.add);
Router.route('/feedback-question/edit/:id').get(ensureAuthenticated, Feedback.edit).post(ensureAuthenticated, Feedback.update);
Router.route('/feedback-question/delete/:id').get(ensureAuthenticated, Feedback.delete);

Router.route('/feedback').get(ensureAuthenticated, Feedback.viewFeedback)
Router.route('/feedback/details/:id').get(ensureAuthenticated, Feedback.viewFeedbackDetails)

module.exports = Router;