let {Product, Item} = require('../../database/models');
module.exports = {
    all: async(req, res) => {
        try{
            let respuesta
            const products = await Product.findAll({include:['edad', 'experiencia', 'ambiente', 'requisitos', 'unidades']})
            const prods = products.map(producto=>{
                let datav = producto.dataValues;
               datav.detail = `/api/products/${datav.id}`       
            })
            if(products.length > 0){
                respuesta = {
                    metadata: {
                        status: 200,
                        cantidad: products.length
                    },
                    resultados: products
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
            const products = await Product.findByPk( req.params.id, {include:['edad', 'experiencia', 'ambiente', 'requisitos', 'unidades']})
            
            console.log(products);
                let datav = products.dataValues;
               datav.link_img = `/images/cursos/${datav.image}`   
               
               console.log(products);
           
            if(Object.keys(products).length > 0){
                respuesta = {
                    metadata: {
                        status: 200,
                    },
                    resultados: products
                }
        }
        res.json(respuesta)
            
        }catch(error){
            console.log(error)
            res.render('error')
        }
    },

    items: async (req, res, next) => {

        try {
        let itemsCart = await Item.findAll({where:{state: 1}, include: ['product']});
        return res.send(itemsCart)
        } catch (error) {
            console.log(error);
        }
       
    }
}