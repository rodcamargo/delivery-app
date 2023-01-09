const salesService = require('../service/sales.service');

const getByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await salesService.getByUserId(id);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const getBySaleId = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await salesService.getBySaleId(id);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
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

module.exports = { getByUserId, getBySaleId, update };