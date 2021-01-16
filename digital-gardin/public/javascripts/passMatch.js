$('#pass, #pass2').on('keyup', function () {
    if ($('#pass').val() == $('#pass2').val()) {
      $('#message').html('Las contraseñas coinciden').css('color', 'green');
    } else 
      $('#message').html('No coinciden').css('color', '#C75D5D');
  });