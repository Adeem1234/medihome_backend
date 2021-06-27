
const User = require("../../model/User");
const Orders = require("../../model/orders");
const Pharmacies = require("../../model/pharmacies");
const Laboratories = require("../../model/laboratories");
const moment = require('moment');


module.exports = {
	index: async (req, res, next) => {

		const date = new Date(Date.now());
		const userCount = await User.find({ type: 'User' }).countDocuments();
		const users = await User.find({ role: false });
		const pharmacies = await Pharmacies.countDocuments();
		const laboratories = await Laboratories.countDocuments();
		const OrdersToday = await Orders.find({ date: { $gte: moment(date).startOf('day'), $lte: moment(date).endOf('day') } }).countDocuments();


		res.render('dashboard', { users, userCount, pharmacies, laboratories, OrdersToday });
	},
};