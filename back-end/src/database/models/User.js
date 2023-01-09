module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { 
      type: DataTypes.STRING,
    },
    email: { 
      type:DataTypes.STRING,
      unique: true, 
    },
    password: { 
      type: DataTypes.STRING, 
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "customer"
    },
  },
  {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Sales,
      { foreignKey: 'userId', as: 'user' });
    User.hasMany(models.Sales,
      { foreignKey: 'sellerId', as: 'sellerUser' });
  };

  return User;
};

