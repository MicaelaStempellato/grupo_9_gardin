window.addEventListener('load', function(){

    const comprar = document.querySelector('.boton-comprar');
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
    
    
            comprar.addEventListener('submit', function(e){
                Swal.fire({
                    text: '¡La compra fue exitosa!',
                    icon: 'success'
                })
                .then(function() {
                    window.location.pathname = "/users/profile";
                });
            })
        })