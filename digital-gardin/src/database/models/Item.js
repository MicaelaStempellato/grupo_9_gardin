const {sequelize, dataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    let alias = "Item";
    
    let cols = {
        sale_price: DataTypes.DECIMAL,
        state: DataTypes.INTEGER,      
        product_id: DataTypes.INTEGER,         
        user_id: DataTypes.INTEGER,
        cart_id: DataTypes.INTEGER,
       

    }
    

    //Esto lo coloco en comentarios ya que poseo mi base de datos sequelizada
    //let config = {
    //    tableName: "cartProduct",
    //    timestamps: false
    //}
    
    const Item = sequelize.define(alias, cols);
    Item.associate =  (models => {
        Item.belongsTo(models.Cart, {
            as: "cart",
            foreignKey: "cart_id",
          });

          Item.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
          });
        
          Item.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id",
          });
    
        
    })
    
    return Item;
}