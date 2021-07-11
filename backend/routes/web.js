const router = require('express').Router();

router.use('/', require('./web/admin'));
router.use('/', require('./web/auth'));
router.use('/', require('./web/doctor'));
router.use('/', require('./web/laboratory'));
router.use('/', require('./web/location'));
router.use('/', require('./web/medicines'));
router.use('/', require('./web/pharmacist'));
router.use('/', require('./web/users'));

module.exports = router;