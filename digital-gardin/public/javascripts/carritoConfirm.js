window.addEventListener('load', function(){

const comprar = document.querySelector('.boton-comprar');
const comprar2 = document.querySelector('.boton-comprar2');
//const Swal = require('sweetalert2')

/*
$(".boton-comprar").on("submit", function(event) {
    event.preventDefault();
    Swal.fire(
        '¡Éxito!',
        'El curso se agregó a tu carrito.',
        'success'
      )
  });


  <script src="/javascripts/carritoConfirm.js" type="text/javascript" defer></script>
  */

  let itemNew = true
  var pathArray = window.location.pathname.split('/');
    var prodId = pathArray[3];

  fetch('/api/items')
  .then(respuesta =>{
    return respuesta.json()
  })
  .then(items=>{
    items.map(item=>{
        if(item.product_id == prodId){
            return itemNew = false
        }
    
    })
    return itemNew
  })
  .then(item=>{
    if(item){

        comprar.addEventListener('submit', function(e){
            Swal.fire({
                text: 'El curso se agregó a tu carrito.',
                icon: 'success'
            })
            .then(function() {
                window.location.pathname = "/products";
            });
        })
        
        comprar2.addEventListener('submit', function(e){
        
            Swal.fire({
                text: 'El curso se agregó a tu carrito.',
                icon: 'success'
            })
            .then(function() {
                window.location.pathname = "/products";
            }); 
        })
          }
          
  })
  .catch(error => console.log(error));
  

})