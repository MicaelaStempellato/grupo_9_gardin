let {Product} = require('../../database/models');
module.exports = {
    all: async(req, res) => {
        try{
            let respuesta
            const products = await Product.findAll({include:['edad', 'experiencia', 'ambiente', 'requisitos', 'unidades']})
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
    }
}