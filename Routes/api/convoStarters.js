const Router = require('express-promise-router')();
const ConvoStatersController = require('../../controller/api/convoStarters');

Router.route('/convo-staters').get(ConvoStatersController.convoStaters);

module.exports = Router;