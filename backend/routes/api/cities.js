const Router = require('express-promise-router')();
const UserController = require('../../controller/api/UserController');

const verifyToken = require('../../middlewares/verifyToken');


Router.route('/get/cities').get(UserController.getCities);


module.exports = Router;