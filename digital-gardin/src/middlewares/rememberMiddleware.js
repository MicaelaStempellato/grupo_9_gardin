const db = require('../database/models');

function rememberMiddleware(req,res,next){

    

    if (req.cookies.recordame != undefined && req.session.userLog == undefined) {
        db.User.findAll({
            where: {
              id: req.cookies.recordame,
            }
          }).then(UserLog => {
            if (UserLog.length>0){
              req.session.userLog = UserLog[0].id;
            }
          })
    }

    next();
}


module.exports = rememberMiddleware;