const router = require('express').Router();

router.use('/', require('./api/Auth'));
router.use('/', require('./api/User'));

module.exports = router;