const db = require('../database/models');

module.exports = async function(req, res, next){
        res.locals.usuarioLog = 0;
        res.locals.nombreLog = 0;
        res.locals.categoriaLog = 0;
        res.locals.avatarLog = 0;
        res.locals.userEmail = 0;
        if (req.session.userLog){
            let usuario = await db.User.findByPk(req.session.userLog, {include: ['category', 'productos']});
            console.log(usuario);
            res.locals.usuarioLog = req.session.userLog;
            res.locals.nombreLog = usuario.dataValues.first_name;
            res.locals.categoriaLog = usuario.dataValues.category_id;
            res.locals.avatarLog = usuario.dataValues.avatar;
            res.locals.userEmail = usuario.dataValues.email;
        }
    
    next();
}