const {sequelize, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const requirement = sequelize.define('Requirement', {
        req_name: DataTypes.STRING,
        product_id: DataTypes.INTEGER

    })
    requirement.associate = (models => {
        requirement.belongsTo(models.Product, {
            as: 'producto',
            foreignKey: 'product_id'
        });

    })
    return requirement
}
