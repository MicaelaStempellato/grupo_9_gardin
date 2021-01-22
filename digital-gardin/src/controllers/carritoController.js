const path = require('path');

const db = require('../database/models');

module.exports = {
    addCart: async function (req, res, next){
        try{
        /*let itemSelec = await db.Item.findAll({
            where:{
                user_id: req.session.userLog,
                product_id: req.body.productId
            }
        })*/
        console.log('ACAAAAAAAA');
        //console.log(itemSelec);
        

        //if(itemSelec.length == 0){
            //Debemos buscar el producto por el id
            db.Product.findByPk(req.body.product_id)
            .then(productos =>{
                //Crear mi items
                //console.log(productos);
                return db.Item.create({
                    sale_price : productos.price,
                    state: 1,
                    user_id: req.session.userLog,
                    product_id: productos.id,
                    cart_id: null
                     
                }) 
                .then((item)  => res.redirect('/products'))
                .catch(error => console.log(error)) 
            })
        /*}else{
            let msg= 'Este curso ya se encuentra en tu carrito';
            db.Product.findByPk(req.body.productId)
            .then((productos) =>{
                res.render(path.resolve(__dirname, '..','views','products','productDetail'), {product: productos, msg: msg});
            })
        }*/
    }catch(error){
        console.log('NOOOOOOO');
        console.log(error);
    }
    }

}