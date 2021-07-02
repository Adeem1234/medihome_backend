const router = require('express').Router();

router.use('/', require('./laboratories/laboratoryOrders'));

module.exports = router;