const Router = require('express-promise-router')();
const LocationController = require('../../../controller/web/LocationController');
const {
  ensureAuthenticated
} = require('../../../config/auth');

Router.route('/get-city-area/:id').get(ensureAuthenticated, LocationController.getCityArea);

module.exports = Router;