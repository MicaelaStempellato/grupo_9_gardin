const db = require('../database/models');

module.exports = async function(req, res, next){
    let usuario = await db.User.findByPk(req.session.userLog, {include: ['category', 'productos']});
    if(req.session.userLog != undefined && usuario.dataValues.category_id == 1){
        next();
    }else{
        res.redirect('/');
    }
}