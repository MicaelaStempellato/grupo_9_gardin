const {sequelize, DataTypes} = require('sequelize');
module.exports = function (sequelize, dataTypes) {
    let alias = "Cart";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        order_number: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }
    
   // let config = {
   //     tableName: "carts",
   //     timestamps: false
   // }
    
    let Cart = sequelize.define(alias, cols);
    
    Cart.associate = function (models){
        Cart.hasMany(models.Item, {
            as: "items",
            foreignKey: "cart_id",
          });
          Cart.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
          });
    
    }   
    
    return Cart;
}




