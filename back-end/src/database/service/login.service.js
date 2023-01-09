const { User } = require('../models');
const md5 = require('md5');
const GetterErrors = require('../utils/getterErrors')


const LoginUser = async ({email, password}) => {
  const users = await User.findOne({ where: { email } });

  if (!users) throw new GetterErrors('Not found', 404)

  if (md5(password) !== users.dataValues.password) throw new GetterErrors('Not found', 404)

  return users;
};

const getUserById = async (id) => {
  const users = await User.findOne({ where: { id } });

  if (!users) throw new GetterErrors('Not found', 404)

  return users;
}

const getAll = async () => User.findAll();

const deleteUser = async (id, role) => {
  const deleted = await User.destroy({ where: { id } })

  if (!deleted) throw new GetterErrors('Not found', 404)

  if (role !== 'administrator') throw new GetterErrors('Unauthorized', 401)

  return deleted 
}

module.exports = { LoginUser, getUserById, getAll, deleteUser }