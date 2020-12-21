function rememberMiddleware(req,res,next){

    

    if (req.cookies.recordame != undefined && req.session.userLog == undefined) {
        db.User.findAll({
            where: {
              email: req.cookies.recordame,
            }
          }).then(UserLog => {
            if (UserLog.length>0){
              req.session.userLog = UserLog;
            }
          })
    }

    next();
}


module.exports = rememberMiddleware;