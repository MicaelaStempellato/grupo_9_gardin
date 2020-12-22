const db = require('../database/models');

module.exports = async function(req, res, next){
    let usuario = await db.User.findByPk(req.session.userLog, {include: ['category', 'productos']});
    let product = await db.Product.findByPk(req.params.id, {include: ['edad', 'experiencia', 'ambiente', 'usuarios']});
    let puedo = false;
    for(let i = 0; i < product.usuarios.length; i++){
    if(req.session.userLog != undefined && usuario.dataValues.category_id == 1 && req.session.userLog == product.usuarios[i].id){
      puedo = true;  
    }
    }
    if(puedo){
        next();
    }else{
        res.redirect('/');
    }
    
}