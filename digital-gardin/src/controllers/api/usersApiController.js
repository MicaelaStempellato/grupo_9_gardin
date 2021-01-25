let {User} = require('../../database/models');
module.exports = {
    all: async(req, res) => {
        try{
            let respuesta
            const users = await User.findAll({include:['category', 'productos'], order: [['id', 'ASC']]})
            const us = users.map(user=>{
                let datav = user.dataValues;
               datav.detail = `/api/users/${datav.id}`       
            })
            if(users.length > 0){
                respuesta = {
                    metadata: {
                        status: 200,
                        cantidad: users.length
                    },
                    resultados: users
                }
        }
        res.json(respuesta)
            
        }catch(error){
            console.log(error)
            res.render('error')
        }
    },

    detail: async(req, res) => {
        try{
            let respuesta
            const users = await User.findByPk(req.params.id,{include:['category']})
            
            console.log(users);
                let datav = users.dataValues;
                if(datav.avatar == null){
                    datav.link_img = `/images/profile-pic.png`  
                }else{
                    datav.link_img = `/images/users/${datav.avatar}`   
                }
                delete datav.password;
               
               console.log(users);
           
            if(Object.keys(users).length > 0){
                respuesta = {
                    metadata: {
                        status: 200,
                    },
                    resultados: users
                }
        }
        res.json(respuesta)
            
        }catch(error){
            console.log(error)
            res.render('error')
        }
    },
}