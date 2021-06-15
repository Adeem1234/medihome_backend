const User = require('../../model/User');

module.exports = {

	showBlocked: async (req, res, next) => {
		const users = await User.find({}).populate('bannedUsers');
		res.render('usersBlocked', { users });
	},
	showAll: async (req, res, next) => {
		const users = await User.find({ role: false });
		res.render('allUsers', { users });
	},
	deleteUser: async (req, res, next) => {
		const { id } = req.params;
		const user = await User.findByIdAndRemove(id);
		res.render(req.headers.referer);
	},
	reportUser: async (req, res, next) => {
		const { id } = req.params;
		const user = await User.findById(id);
		user.is_banned = !user.is_banned;
		await user.save();
		// Refer back the the same url of which this url is hitted
		res.redirect(req.headers.referer);
	},
	viewProfile: async (req, res, next) => {
		const { id } = req.params;
		const user = await User.findById(id).select('avatar name unique_id userName age reviews')
		res.render('userProfile', { user })

	}
};