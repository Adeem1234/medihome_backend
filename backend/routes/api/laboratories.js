const Router = require('express-promise-router')();
const LaboratoryController = require('../../controller/api/LaboratoryController');

const verifyToken = require('../../middlewares/verifyToken');


Router.route('/get/laboratories').get(verifyToken, LaboratoryController.getLaboratories);

module.exports = Router;