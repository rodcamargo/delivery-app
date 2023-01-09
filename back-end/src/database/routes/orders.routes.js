const { Router } = require('express');

const ordersController = require('../controller/orders.controller');

const router = Router()

router.get('/:id/orders', ordersController.getByUserId)

module.exports = router 