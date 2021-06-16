const router = require('express').Router();

router.use('/', require('./web/admin'));
router.use('/', require('./web/auth'));
router.use('/', require('./web/pharmacist'));
router.use('/', require('./web/doctor'));
// router.use('/', require('./web/users'));
// router.use('/', require('./web/settings'));

module.exports = router;