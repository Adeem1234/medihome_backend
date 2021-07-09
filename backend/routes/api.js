const router = require('express').Router();

router.use('/', require('./api/Auth'));
router.use('/', require('./api/User'));
router.use('/', require('./api/laboratories'));
router.use('/', require('./api/pharmacies'));

module.exports = router;