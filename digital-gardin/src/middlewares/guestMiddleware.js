const db = require('../database/models');

module.exports = function(req, res, next){
    if(req.session.userLog == undefined ){
        next();
    }else{
        res.redirect('/users/profile');
    }
}