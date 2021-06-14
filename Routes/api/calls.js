const Router = require('express-promise-router')();
const { makeCall, generateAccessToken, myCalls } = require('../../controller/api/calls');
const CallController = require('../../controller/api/calls');
const { callValidation } = require('../../middlewares/verification');

const verifyToken = require('../../middlewares/verifyToken');

const nocache = (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
};

Router.route('/access_token').post([nocache, verifyToken], generateAccessToken)

Router.route('/call').post(verifyToken, makeCall);

Router.route('/mycalls').post(verifyToken, myCalls);

module.exports = Router;