const UsersModel = require('../../model/UsersModel');

module.exports = {

	showBlocked: async (req, res, next) => {
		const users = await UsersModel.find({}).populate('bannedUsers');
		res.render('usersBlocked', { users });
	},
	showAll: async (req, res, next) => {
		const users = await UsersModel.find({});
		res.render('usersList', { users });
	},
	deleteUser: async (req, res, next) => {
		const { id } = req.params;
		const user = await UsersModel.findByIdAndRemove(id);
		res.render(req.headers.referer);
	},
	reportUser: async (req, res, next) => {
		const { id } = req.params;
		const user = await UsersModel.findById(id);
		user.is_banned = !user.is_banned;
		await user.save();
		// Refer back the the same url of which this url is hitted
		res.redirect(req.headers.referer);
	},
	viewProfile: async (req, res, next) => {
		const { id } = req.params;
		const user = await UsersModel.findById(id).select('avatar name unique_id userName age reviews')
		res.render('userProfile', { user })

	}
};