const UsersModel = require('../../model/UsersModel');
const CitiesModel = require('../../model/CitiesModel');
const bcrypt = require('bcryptjs')

module.exports = {
	addNew: async (req, res) => {
		const cities = await CitiesModel.find({}).select('name')
		return res.render('usersAdd', { cities })
	},
	saveNew: async (req, res) => {
		console.log(req.data)
		const { email, type, password, name, phoneNo, city, area } = req.body;
		const oldUser = await UsersModel.findOne({ email: email });
		if (!oldUser) {
			const salt = await bcrypt.genSalt(10);
			const hashpassword = await bcrypt.hash(password, salt);
			let user = new UsersModel({ name: name, email: email, type: type, password: hashpassword, phoneNo: phoneNo, city: city, area: area });
			user = await user.save();
			return res.redirect('/admin/users')
		}
		else { return res.send(401).send({ data: { msg: 'This Email is Already Registered' } }) }
	},
	showAll: async (req, res, next) => {
		const users = await UsersModel.find({}).populate({ path: 'city', model: 'cities' }).populate({ path: 'area', model: 'areas' });
		res.render('usersList', { users });
	},
	deleteUser: async (req, res, next) => {
		const { id } = req.params;
		const user = await UsersModel.findByIdAndRemove(id);
		console.log(req.headers)
		res.redirect(req.headers.referer);
	},

};