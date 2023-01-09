const fs = require('fs')
const productsService = require('../service/products.service');


const getAll = async (_req, res, next) => {
  try {
    const result = await productsService.getAllProducts()

    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll }