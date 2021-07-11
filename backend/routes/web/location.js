const Router = require('express-promise-router')();
const LocationController = require('../../controller/web/LocationController');
const {
  ensureAuthenticated
} = require('../../config/auth');

Router.route('/get-city-area/:id').get(ensureAuthenticated, LocationController.getCityArea);
Router.route('/locations').get(ensureAuthenticated, LocationController.getLocations);
Router.route('/location/add').get(ensureAuthenticated, LocationController.addLocationGet).post(ensureAuthenticated, LocationController.addCityAndArea);
Router.route('/add-area').get(ensureAuthenticated, LocationController.AddAreaGet).post(ensureAuthenticated, LocationController.AddArea)

module.exports = Router;