const { Sales, User, Products, SalesProducts } = require('../models');
const GetterErrors = require('../utils/getterErrors');

const getByUserId = async (id) => {
    const sales = await Sales.findAll({ where: { userId: +id }});
    return sales;
}

const getBySaleId = async (id) => {
    const sale = await Sales.findOne({ where: { id }, include: [
        { model: Products, as: 'products'},
        { model: User, as: 'seller', attributes: {exclude: ['password']}},
        { model: User, as: 'user', attributes: {exclude: ['password']}}
    ] })
    return sale;
}

const getSales = async (id) => {
    const sales = await Sales.findAll({ where: { sellerId: id } })
  
    if (!sales) throw new GetterErrors('not found products', 404) 
  
    return sales
  }
  
  const getSalesProducts = async (id) => {
    const sales = await Sales.findOne({ where: { id }, 
      include: { 
        model: Products, as: 'products',
        attributes: { exclude: ['urlImage'] },
        through: { attributes: [] }
       }
    });
  
    const qtd = await SalesProducts.findAll({where: { saleId: id }, raw: true})
  
    const newsale = sales.products.map((el) => {
      const find = qtd.find((Element) => {
        return Element.productId === el.id
      })
      return { ...el.dataValues, quantity: find.quantity}
    })
  
    return {...sales.dataValues, products: newsale}
  }
  
  const update = async (id, status) => {
    const [sales] = await Sales.update({ status }, { where: { id } })
  
    if (!sales) throw new GetterErrors('not found products', 404) 
  
    const updateProdut = await getSalesProducts(id)
  
    return updateProdut;
  }

module.exports = { getByUserId, getBySaleId, getSales, getSalesProducts, update };