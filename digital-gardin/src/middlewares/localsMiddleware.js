module.exports = function(req, res, next){
    res.locals.usuario = false;
    if (req.session.UserLog){
        res.locals.usuarioLog = req.session.UserLog.email;
        res.locals.nombre = req.session.UserLog.first_name
    } else if (req.cookies.recordame){
        req.session.usuario = req.cookies.recordame;
        res.locals.usuarioLog = res.session.usuario
    }
    next();
}