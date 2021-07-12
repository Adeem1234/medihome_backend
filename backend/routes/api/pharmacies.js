const Router = require('express-promise-router')();
const PharmacyController = require('../../controller/api/PharmacyController');

const verifyToken = require('../../middlewares/verifyToken');


Router.route('/get/pharmacies').get(verifyToken, PharmacyController.getPharmacies);
Router.route('/get/pharmacy/:id').get(verifyToken, PharmacyController.getPharmacy);


module.exports = Router;