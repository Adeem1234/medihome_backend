const router = require('express').Router();

router.use('/', require('./pharmacists/pharmacyOrders'));

module.exports = router;