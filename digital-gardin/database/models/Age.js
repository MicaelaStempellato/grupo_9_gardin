const {sequelize, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const age = sequelize.define('Age', {
        category_name: DataTypes.STRING,
    });
    age.associate = models => {
        age.hasMany(models.Product, {
            as: 'productos',
            foreignKey: 'age_id'
        })
    }
    return age
}
