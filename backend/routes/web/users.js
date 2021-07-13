const Router = require('express-promise-router')();
const User = require('../../controller/web/usersData');
const {
  ensureAuthenticated
} = require('../../config/auth');

// Router.route('/users/all-blocked').get(ensureAuthenticated, User.showBlocked);

// Router.route('/users/all-reported').get(ensureAuthenticated, User.showReported);

Router.route('/users').get(ensureAuthenticated, User.showAll);
Router.route('/users/new').get(ensureAuthenticated, User.addNew).post(ensureAuthenticated, User.saveNew);

// Router.route('/users/report/:id').get(ensureAuthenticated, User.reportUser);

Router.route('/users/delete/:id').get(ensureAuthenticated, User.deleteUser);

// Router.route('/user/profile/:id').get(ensureAuthenticated, User.viewProfile);

module.exports = Router;