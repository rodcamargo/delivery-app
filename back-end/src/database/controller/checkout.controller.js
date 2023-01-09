const { getProductsById } = require('../service/products.service');
const { getUserByRole, closeOrder } = require('../service/checkout.service');

const getProducts = async (req, res, next) => {
    try {
        const result = await getProductsById(JSON.parse(req.body.cart));
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const getSellers = async (req, res, next) => {
    try {
        const result = await getUserByRole('seller')
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const close  = async (req, res, next) => {
    try {
        const order = await closeOrder(req.body, req.user.id);
        return res.status(201).json(order);
    } catch (error) {
        next(error);
    }
}

module.exports = { getProducts, getSellers, close }
