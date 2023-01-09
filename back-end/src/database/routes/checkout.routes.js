const { Router } = require('express');

const checkoutController = require('../controller/checkout.controller')

const router = Router()

router.post('/', checkoutController.getProducts);
router.post('/close', checkoutController.close);
router.get('/sellers', checkoutController.getSellers);

module.exports = router 