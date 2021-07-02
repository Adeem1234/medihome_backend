const router = require('express').Router();

router.use('/', require('./admin/admin'));
router.use('/', require('./admin/doctor'));
router.use('/', require('./admin/laboratory'));
router.use('/', require('./admin/location'));
router.use('/', require('./admin/pharmacist'));
// router.use('/', require('./admin/users'));

module.exports = router;