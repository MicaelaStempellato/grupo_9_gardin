const {sequelize, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const experience = sequelize.define('Experience', {
        category_name: DataTypes.STRING,
    });
    experience.associate = models => {
        experience.hasMany(models.Product, {
            as: 'productos',
            foreignKey: 'experience_id'
        })
    }
    return experience
}
