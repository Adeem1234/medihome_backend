const Call = require("../../model/calls");
const User = require("../../model/User");
const moment = require('moment');


module.exports = {
	index: async (req, res, next) => {

		let sessionObj = JSON.parse(req.sessionStore.sessions[req.sessionID])
		let userId = sessionObj.passport.user;
		const user = await User.findById(userId);
		// if (user.role === 'Admin') {
		// 	// return res.redirect('/login');
		// }
		// if (user.role === 'Pharmacy Manager') {
		// 	// return res.redirect('/login');
		// }
		// if (user.role === 'Laboratory Manager') {
		// 	// return res.redirect('/login');
		// }
		console.log(user)





		const date = new Date(Date.now());
		const users = await User.find({ role: false });
		const usersCount = await User.find({ role: false }).countDocuments();
		const bannedUsers = await User.find({ is_banned: true }).countDocuments();
		const callsToday = await Call.find({ date: { $gte: moment(date).startOf('day'), $lte: moment(date).endOf('day') } }).countDocuments();
		console.log(callsToday)


		res.render('dashboard', { users, usersCount, callsToday, bannedUsers });
	},
};