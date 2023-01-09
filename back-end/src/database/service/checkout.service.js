const { User, Sales, SalesProducts } = require('../models');
const GetterErrors = require('../utils/getterErrors')
  
  const getUserByRole = async (role) => {
    const users = await User.findAll({ where: { role } });
  
    if (!users) throw new GetterErrors('Not found', 404)
  
    return users;
  }

  const insertSalesProducts = async (saleId, products) => {
    console.log(SalesProducts);
    const salesProducts = await SalesProducts.bulkCreate(
      products.map((curr) => ({ saleId, productId: curr.id, quantity: curr.quantity }))
    )
    return salesProducts;
  }

  const closeOrder = async (body, userId) => {
    try {
      const { sale, products } = body;
      const { sellerId, totalPrice, deliveryAddress, deliveryNumber } = sale;
      const saleObj = { 
        userId: userId,
        sellerId: sellerId,
        totalPrice: totalPrice,
        deliveryAddress: deliveryAddress,
        deliveryNumber: deliveryNumber,
        saleDate: new Date(),
        status: 'Pendente',
      }
      const newSale = await Sales.create(saleObj);

      const eba = await insertSalesProducts(newSale.dataValues.id, products);

      return { saleId: newSale.dataValues.id, saleDate: saleObj.saleDate, sale: newSale, eba };
    } catch (error) {
      console.log(error);
      new GetterErrors(error.message, '500')
    }
  }

  module.exports = { getUserByRole, closeOrder }