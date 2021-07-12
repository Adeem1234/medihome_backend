const router = require('express').Router();

router.use('/', require('./api/Auth'));
router.use('/', require('./api/User'));
router.use('/', require('./api/laboratories'));
router.use('/', require('./api/pharmacies'));
router.use('/', require('./api/cities'));
router.use('/', require('./api/doctors'));
router.use('/', require('./api/Orders'));

module.exports = router;