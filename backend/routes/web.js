const router = require('express').Router();

router.use('/', require('./web/admin'));
router.use('/', require('./web/auth'));

module.exports = router;