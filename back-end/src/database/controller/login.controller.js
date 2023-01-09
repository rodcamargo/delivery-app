const fs = require('fs')
const loginService = require('../service/login.service');
const jwt = require('jsonwebtoken');

const secretKey = fs.readFileSync('jwt.evaluation.key')

const login = async (req, res, next) => {
  const {email, password} = req.body

  try {
    const { id, name, role } = await loginService.LoginUser({ email, password })
    
    const token = jwt.sign({ id, email, role }, secretKey)

    res.status(200).json({ id, name, email, role, token })
  } catch (error) {
    next(error)
  }
}

const getAll = async (_req, res, next) => {
  try {
    const result = await loginService.getAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

const deleted = async (req, res, next) => {
  const { id } = req.params
  const { role } = req.user
  try {
    const result = await loginService.deleteUser(id, role);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { login, getAll, deleted }