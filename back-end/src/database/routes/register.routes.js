const { Router } = require('express');

const registerController = require('../controller/register.controller')

const registerRouter = Router()

registerRouter.post('/', (req, res, next) => registerController.register(req, res, next))

module.exports = registerRouter