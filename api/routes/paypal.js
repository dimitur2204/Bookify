const {Router} = require('express');
const paypal = require('../modules/paypal/payment');
const router = Router();


router.route('/create')
    .post(paypal.createPayment);

router.route('/cancel')
    .get(paypal.cancel);

router.route('/process')
    .get(paypal.process);

module.exports = router;
