const {sequelize, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const units = sequelize.define('Unit', {
        unit_name: DataTypes.STRING,
        product_id: DataTypes.INTEGER

    })
    units.associate = (models => {
        units.belongsTo(models.Product, {
            as: 'producto',
            foreignKey: 'product_id'
        });

    })
    return units
}
