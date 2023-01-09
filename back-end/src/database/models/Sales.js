const User = require('./User');

module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    totalPrice: { 
      type: DataTypes.DECIMAL(9, 2), 
    },
    deliveryAddress: {
      type: DataTypes.STRING(100)
    },
    deliveryNumber: {
      type: DataTypes.STRING(50)
    },
    saleDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.STRING(50)
    }
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });

  Sales.associate = (models) => {
    models.Sales.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })

    models.Sales.belongsTo(models.User, {
      as: 'seller',
      foreignKey: 'sellerId',
      onDelete: 'CASCADE'
    })
  }

  return Sales;
};

