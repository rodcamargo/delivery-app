const { Router } = require('express');

const loginController = require('../controller/login.controller')

const router = Router()

router.get('/users', loginController.getAll)
router.delete('/:id', loginController.deleted)


module.exports = router 