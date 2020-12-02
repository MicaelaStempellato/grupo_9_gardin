const {sequelize, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define('Category', {
        category_name: DataTypes.STRING
    })
    category.associate = (models => {
        category.hasMany(models.User, {
            as: 'user',
            foreignKey: 'category_id'
        });
    })
    return category
}