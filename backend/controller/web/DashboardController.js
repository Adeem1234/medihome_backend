
const User = require("../../model/UsersModel");
const Orders = require("../../model/OrdersModel");
const Pharmacies = require("../../model/PharmaciesModel");
const Laboratories = require("../../model/LaboratoriesModel");
const moment = require('moment');



module.exports = {
	index: async (req, res, next) => {
		const user = await User.findById(JSON.parse(req.sessionStore.sessions[req.sessionID]).passport.user);
		if (user) {
			if (user.type === 'Admin') {
				const date = new Date(Date.now());
				const userCount = await User.find({ type: 'User' }).countDocuments();
				const users = await User.find({});
				const pharmacies = await Pharmacies.countDocuments();
				const laboratories = await Laboratories.countDocuments();
				const OrdersToday = await Orders.find({ date: { $gte: moment(date).startOf('day'), $lte: moment(date).endOf('day') } }).countDocuments();
				return res.render('dashboard', { user, users, userCount, pharmacies, laboratories, OrdersToday });
			}
			else if (user.type === 'Pharmacist') {
				const date = new Date(Date.now());
				const pharmacy = await Pharmacies.find({ manager: user._id })
				const ordersToday = await Orders.find({ date: { $gte: moment(date).startOf('day'), $lte: moment(date).endOf('day') } }).countDocuments();
				const pendingOrders = await Orders.find({ status: 'pending' }).countDocuments();
				const orders = await Orders.find({ pharmacy: pharmacy._id })
				return res.render('pharmacistDashboard', { user, pharmacy, ordersToday, pendingOrders, orders });
			}
		}
	},
};