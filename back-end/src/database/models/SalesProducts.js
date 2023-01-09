module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    sale_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    product_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    underscored: true,
  });

  SalesProducts.associate = (models) => {
    models.Products.belongsToMany(models.Sales, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });

    models.Sales.belongsToMany(models.Products , {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  };

  return SalesProducts;
};
