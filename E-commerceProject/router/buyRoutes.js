

const express = require('express')
const { buyWithoutDiscount } = require('../controllers/buy/WithoutDiscountController');
const { buyWithDiscount } = require('../controllers/buy/WithDiscountController');

const router = express.Router()


router.post('/WithoutDiscount', buyWithoutDiscount)
router.post('/WithDiscount', buyWithDiscount)




module.exports = router