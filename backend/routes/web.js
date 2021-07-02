const router = require('express').Router();

router.use('/', require('./web/admin'));
router.use('/', require('./web/auth'));
router.use('/', require('./web/pharmacists'))
router.use('/', require('./web/laboratories'))

module.exports = router;