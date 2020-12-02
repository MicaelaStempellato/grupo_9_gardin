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
    })
    return user
}