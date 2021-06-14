const Router = require('express-promise-router')();
const ReportController = require('../../controller/api/reportAndBlock');
const { reportValidation } = require('../../middlewares/verification');
const verifyToken = require('../../middlewares/verifyToken');

Router.route('/report').post([verifyToken, reportValidation], ReportController.report);
Router.route('/block').post(verifyToken, ReportController.block);
Router.route('/unblock').post(verifyToken, ReportController.unBlock);

module.exports = Router;