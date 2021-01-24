const {sequelize, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        avatar: DataTypes.STRING,
        category_id: DataTypes.INTEGER
    })
    user.associate = (models => {
        user.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });
        user.belongsToMany(models.Product,{
            as: 'productos',
            through: 'products_users',
            foreignKey: 'user_id',
            otherKey: 'product_id'
        });
        user.hasMany(models.Item, {
            foreignKey: "user_id",
            as: "items",
          });
      
          // associate with carts
          user.hasMany(models.Cart, {
            foreignKey: "user_id",
            as: "carts",
          })
    })
    return user
}