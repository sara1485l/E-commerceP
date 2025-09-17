

const express = require('express')
const { buyWithoutDiscount } = require('../controllers/buyController/WithoutDiscountController');
const { buyWithDiscount } = require('../controllers/buyController/WithDiscountController');
const { authenticate, isAdmin } = require("../middleware/auth");

const router = express.Router()


router.post('/WithoutDiscount',authenticate, buyWithoutDiscount)
router.post('/WithDiscount',authenticate, buyWithDiscount)




module.exports = router