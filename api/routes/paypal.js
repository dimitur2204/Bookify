const {Router} = require('express');
const { protect, permitRoles } = require('../middleware/auth');
const paypal = require('../modules/paypal/payment');
const router = Router();


router.route('/create')
    .post(protect,permitRoles('user'),paypal.createPayment);

router.route('/cancel')
    .get(paypal.cancel);

router.route('/process')
    .get(paypal.process);

module.exports = router;
