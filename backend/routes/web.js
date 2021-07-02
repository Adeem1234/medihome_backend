const router = require('express').Router();

router.use('/', require('./web/admin'));
router.use('/', require('./web/auth'));
router.use('/', require('./web/pharmacist'));
router.use('/', require('./web/laboratory'));
router.use('/', require('./web/doctor'));

module.exports = router;