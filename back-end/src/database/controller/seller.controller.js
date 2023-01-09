const salesService = require('../service/sales.service');

const sales = async (req, res, next) => {
  const { dataValues } = req.user
  try {
    const result = await salesService.getSales(dataValues.id);
    
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const salesProducts = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await salesService.getSalesProducts(id);
    
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { status } = req.body
  try {
    const result = await salesService.update(id, status);
    
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = { sales, salesProducts, update }
