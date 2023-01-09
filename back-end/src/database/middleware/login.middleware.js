const fs = require('fs')
const jwt = require('jsonwebtoken');
const UserService = require('../service/login.service');

const secretKey = fs.readFileSync('jwt.evaluation.key')

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    const user = await UserService.getUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};