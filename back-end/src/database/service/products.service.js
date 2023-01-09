const { Products } = require('../models');
// const GetterErrors = require('../utils/getterErrors')


const getAllProducts = async () => {
  const products = await Products.findAll();

  return products;
};

const getProductsById = async (products) => {
  // {[Op.in]: products.map((product) => +product.id)}
  const dataValues = await Products.findAll({ where: { 
    id: products.map((product) => +product.id),
   } });

  const productsWithQty = dataValues.map((product) => {
    const { quantity } = products.find((curr) => curr.id === product.id);
    return { ...product.dataValues, quantity};
  });
   
  return productsWithQty;
}



module.exports = { getAllProducts, getProductsById}