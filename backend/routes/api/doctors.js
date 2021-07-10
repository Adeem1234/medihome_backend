const Router = require('express-promise-router')();
const DoctorController = require('../../controller/api/DoctorController');

const verifyToken = require('../../middlewares/verifyToken');


Router.route('/get/doctors').get(verifyToken, DoctorController.getDoctors);


module.exports = Router;