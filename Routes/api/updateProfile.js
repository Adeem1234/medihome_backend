const Router = require('express-promise-router')();
const ProfileController = require('../../controller/api/updateProfile');
const { emojiValidation, colorValidation, profileUpdateValodation, avatarValidation } = require('../../middlewares/verification');

const verifyToken = require('../../middlewares/verifyToken');

Router.route('/update-profile').post([verifyToken, profileUpdateValodation], ProfileController.updateProfile);
Router.route('/update-emoji').post([verifyToken, emojiValidation], ProfileController.updateEmoji);
Router.route('/update-color').post([verifyToken, colorValidation], ProfileController.updateColor);
Router.route('/update-avatar').post([verifyToken, avatarValidation], ProfileController.updateAvatar);


module.exports = Router;