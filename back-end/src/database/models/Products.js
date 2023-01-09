module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING(200),
  }, {
    tableName: 'products',
    timestamps: false,
    underscored: true,
  });

  return Products;
};  
