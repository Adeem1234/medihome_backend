const router = require('express').Router();

router.use('/', require('./api/Auth'));
router.use('/', require('./api/User'));
router.use('/', require('./api/feedback'));
router.use('/', require('./api/convoStarters'));
router.use('/', require('./api/addRemoveFriend'));
router.use('/', require('./api/updateProfile'));
router.use('/', require('./api/reviews'));
router.use('/', require('./api/reportAndBlock'));
router.use('/', require('./api/calls'));
router.use('/', require('./api/suggestedQuestions'));

module.exports = router;