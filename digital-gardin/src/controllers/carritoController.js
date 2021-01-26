const path = require('path');

const db = require('../database/models');

module.exports = {
    addCart: async function (req, res, next){
        try{
        let itemSelec = await db.Item.findAll({
            where:{
                user_id: req.session.userLog,
                product_id: req.body.product_id
            }
        })
        console.log('ACAAAAAAAA');
        //console.log(itemSelec);
        

        if(itemSelec.length == 0){
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
        }else{

            let product = await db.Product.findByPk(req.body.product_id, {include: ['edad', 'experiencia', 'ambiente', 'usuarios']});
			let unidades = await db.Unit.findAll({
				where: {
					product_id: req.body.product_id
				}
			})
			let esta = false;
			for(let i = 0; i < product.usuarios.length; i++){
				if(req.session.userLog == product.usuarios[i].id){
					esta = true
				}


			}
			
			let requisitos = await db.Requirement.findAll({
				where: {
					product_id: req.body.product_id
				}
            })
            
            let msg = 'Este curso ya se encuentra en tu carrito'

                res.render(path.resolve(__dirname, '..','views','products','productDetail'), {msg: msg, title: 'Digital Gardin', css: 'pdetail_styles', product, unidades, requisitos, esta});
            
        }
    }catch(error){
        console.log('NOOOOOOO');
        console.log(error);
    }
    },

	carrito: async function(req, res, next) {
        try{
            let ItemsCart = await db.Item.findAll({ where: { user_id: req.session.userLog, state: 1 }, include: ['product'] });
            //return res.send(ItemsCart)
            let total = 0;
            for (let i = 0; i < ItemsCart.length; i++) {
                total += Number(ItemsCart[i].sale_price);
                }
            
            res.render('products/productCart', { title: 'Carrito', css: 'productCart_Styles', cart: ItemsCart, total: total })
            
        
        }catch(error){
            console.log(error);
        }
    },
    
    delete: function (req, res) {
        
           
        db.Item.destroy({
            
            where:{
                product_id : req.body.product_id,
                user_id : req.session.userLog
            }})
            .then(()=> res.redirect('/products/carrito'))
            .catch(error => console.log(error))

    },
    compra: (req,res)=>{
        let totalPrecio = 0;
        db.Item.findAll({
            where:{
                userId: req.session.userLog,
                state: 1
            }
        })
        db.Cart.findOne()
        .then((cart)=>{
            return db.Cart.create({
                order_number: cart ? cart.order_number + 1 : 1,
                user_id: req.session.userLog
            })
        })
        .then(cart =>{
            Item.update({
                state: 0,
                cart_id: cart.id
            },{
                where: {
                    user_id: req.session.userLog,
                    state: 1
                }
            }
            )
        })
        .then(()=> res.redirect('/carrito/historial'))
        .catch(error => console.log(error))
    },
    historial: function(req,res){
        db.Cart.findAll({
            where: {
                userId : req.session.userLog
            },
            include: {
                all: true,
                nested: true
            }
        })
        .then(carts =>{
            res.send(carts);           
        })
    }

}