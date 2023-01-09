const { Router } = require('express');

const ordersController = require('../controller/orders.controller');

const router = Router()

router.get('/:id', ordersController.getBySaleId)
router.patch('/:id/delivered', ordersController.update)

module.exports = router 