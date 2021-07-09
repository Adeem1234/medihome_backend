const Router = require('express-promise-router')();
const PharmacyController = require('../../controller/api/PharmacyController');

const verifyToken = require('../../middlewares/verifyToken');


Router.route('/get/pharmacies').get(verifyToken, PharmacyController.getPharmacies);

module.exports = Router;