const {sequelize, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('Product', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        age_id: DataTypes.INTEGER,
        experience_id: DataTypes.INTEGER,
        environment_id: DataTypes.INTEGER,
        language: DataTypes.STRING,
        price: DataTypes.INTEGER,
        image: DataTypes.STRING,
        professor: DataTypes.STRING,
        duration: DataTypes.STRING,

    })
    product.associate = (models => {
        product.belongsTo(models.Age, {
            as: 'edad',
            foreignKey: 'age_id'
        });
        product.belongsTo(models.Experience, {
            as: 'experiencia',
            foreignKey: 'experience_id'
        });
        product.belongsTo(models.Environment, {
            as: 'ambiente',
            foreignKey: 'environment_id'
        });
        product.hasMany(models.Requirement, {
            as: 'requisitos',
            foreignKey: 'product_id'
        });
        product.hasMany(models.Unit, {
            as: 'unidades',
            foreignKey: 'product_id'
        });
        product.belongsToMany(models.User,{
            as: 'usuarios',
            through: 'products_users',
            foreignKey: 'product_id',
            otherKey: 'user_id'
        });


    //Aquí hago la relación entre mi módelo Dish y mi tabla items  la cual contiene todo lo que el usuario está comprando
        product.hasMany(models.Item, {
            as: "items",
            foreignKey: "product_id"
        })

    })
    return product
}
