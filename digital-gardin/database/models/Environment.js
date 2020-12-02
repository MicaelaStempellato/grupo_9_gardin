const {sequelize, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const environment = sequelize.define('Environment', {
        category_name: DataTypes.STRING,
    });
    environment.associate = models => {
        environment.hasMany(models.Product, {
            as: 'productos',
            foreignKey: 'environment_id'
        })
    }
    return environment
}
