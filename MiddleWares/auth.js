const jwt = require('jsonwebtoken');
const User = require('../model/User');

module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        let sessionObj = JSON.parse(req.sessionStore.sessions[req.sessionID])
        let userId = sessionObj.passport.user;
        const user = User.findById(userId);
        if (user.role === 'Admin') {
            return res.redirect('/admin/login');
        }
        if (user.role === 'Pharmacy Manager') {
            return res.redirect('/admin/login');
        }
        if (user.role === 'Laboratory Manager') {
            return res.redirect('/admin/login');
        }

    },
    forwardAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/admin/dashboard');
    },

    ClientAuthentication: async (req, res, next) => {
        const token = req.headers.token;
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        try {
            const getuser = await User.findById(user._id);
            if (getuser) {
                return next();
            }
        } catch (err) {
            res.status(403).send(err);
            return null;
        }
    },
};