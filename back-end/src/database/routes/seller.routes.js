const { Router } = require('express');

const sellerController = require('../controller/seller.controller')

const router = Router()

router.get('/orders', sellerController.sales);
router.get('/orders/:id', sellerController.salesProducts);
router.patch('/orders/:id', sellerController.update);

module.exports = router
