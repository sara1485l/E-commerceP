

const express = require('express')
const { buyWithoutDiscount } = require('../controllers/buyController/WithoutDiscountController');
const { buyWithDiscount } = require('../controllers/buyController/WithDiscountController');

const router = express.Router()


router.post('/WithoutDiscount', buyWithoutDiscount)
router.post('/WithDiscount', buyWithDiscount)




module.exports = router