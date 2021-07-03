// Admin Login and Register Controller

const bcrypt = require('bcryptjs');
const passport = require('passport');
//require User Model for the Database
const User = require('../../model/UsersModel');

module.exports = {
	getLogin: async (req, res) => {
		res.render('login');
	},
	getRegister: async (req, res) => {
		res.render('register');
	},
	postRegister: async (req, res, next) => {
		const {
			email,
			name,
			password,
			password2
		} = req.body;
		let error = [];
		const role = true;
		if (!name || !email || !password || !password2) {
			error.push('Please Fill all the Fields to Register');
		}
		if (password !== password2) {
			error.push('Password not Same try Again');
		}
		if (password.length < 6) {
			error.push({
				message: 'Password less then 6 character'
			});
		}
		if (error.length > 0) {
			res.render('register', {
				email,
				error,
				name,
				password,
				password2
			});
		} else {
			User.findOne({
				email: email
			}).then(async (user) => {
				if (user) {
					error.push({
						message: 'Email already exits'
					});
					res.render('register', {
						email,
						error,
						name,
						password,
						password2
					});
				} else {
					// const salt = await bcrypt.genSalt(10);
					const hashpassword = await bcrypt.hashSync(password, 10);
					const newUser = new User({
						email: email,
						name: name,
						password: hashpassword,
						role: true,
					});
					await newUser
						.save()
						.then((user) => {
							req.flash('success_msg', 'You are now registered and can log in');
							res.redirect('/admin/dashboard');
						})
						.catch((err) => console.error(err));
				}
			});
		}
	},
	postLogin: async (req, res, next) => {
		passport.authenticate('local', {
			failureFlash: true,
			failureRedirect: '/admin/login',
			successRedirect: '/admin/dashboard',
		})(req, res, next);
	},
	Logout: async (req, res, next) => {
		req.logout();
		req.flash('success_msg', 'You are Logged out');
		res.redirect('/admin/login');
	},
	welcome: (req, res, next) => {
		res.render('welcome');
	},
};