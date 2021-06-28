const router = require('express').Router();

router.use('/', require('./web/admin'));
router.use('/', require('./web/auth'));
router.use('/', require('./web/pharmacist'));
router.use('/', require('./web/laboratory'));

module.exports = router;