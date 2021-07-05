const router = require('express').Router();

router.use('/', require('./api/Auth'));
router.use('/', require('./api/User'));
router.use('/', require('./api/laboratories'));

module.exports = router;