const Router = require('express-promise-router')();
const OrderController = require('../../controller/api/OrderController');

const verifyToken = require('../../middlewares/verifyToken');


Router.route('/place/order').post(verifyToken, OrderController.placeOrder);


module.exports = Router;