const Router = require('express-promise-router')();
const FriendsController = require('../../controller/api/friends');
const { addFriendValidation, removeFriendValidation, acceptFriendValidation, rejectFriendValidation } = require('../../middlewares/verification');

const verifyToken = require('../../middlewares/verifyToken');

Router.route('/show/friends').post(verifyToken, FriendsController.showFriends); //done

Router.route('/friend/add').post([verifyToken, addFriendValidation], FriendsController.add); //done

Router.route('/friend/remove').post([verifyToken, removeFriendValidation], FriendsController.remove); //done

Router.route('/friend/accept').post([verifyToken, acceptFriendValidation], FriendsController.confirmRequest); //done

Router.route('/friend/reject').post([verifyToken, rejectFriendValidation], FriendsController.cancelRequest); //done

Router.route('/friend/requests').post(verifyToken, FriendsController.showPendingRequests);

module.exports = Router;