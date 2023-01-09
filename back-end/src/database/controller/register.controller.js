const registerService = require('../service/register.service');
const fs = require('fs')
const jwt = require('jsonwebtoken');

const secretKey = fs.readFileSync('jwt.evaluation.key')

const register = async (req, res, next) => {
    try {
      const { id, name, role, email } = await registerService.createUser(req.body)

      const token = jwt.sign({ id, email, role }, secretKey)

      return res.status(201).json({ id, name, email, role, token })
    } catch (error) {
      next(error)
    }
  };

module.exports = { register }