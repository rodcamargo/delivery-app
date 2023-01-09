const md5 = require('md5');
const { User } = require('../models');
const GetterErrors = require('../utils/getterErrors')

const createUser = async ({name, email, password, role}) => {
    const userExist = await User.findOne({ where: { email } });
    if (userExist) throw new GetterErrors('Conflict', 409);
    const newUser = await User.create({
      name,
      email,
      password: md5(password),
      role: role || 'customer',
    });
    return newUser
  }

module.exports = { createUser }