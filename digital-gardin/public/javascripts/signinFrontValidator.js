const firstname = document.querySelector('#firstname');
const surname = document.querySelector('#surname');
const email = document.querySelector('#email');
const pass = document.querySelector("#pass");
const pass2 = document.querySelector("#pass2");
const formulario = document.querySelector('form.formulario');
var errores = {}
/*fetch('http://localhost:3000/api/products')
.then(function(response){
    return response.json()
})
.then(function(data){
    data.resultados.map(users=>{
        users.email
    })
})*/

function passMatch(pass1, pass2){

    if ($(pass1).val() != $(pass2).val()) {
      $('#message').html('Las contraseñas coinciden').css('color', 'green');
    } else 
      $('#message').html('No coinciden').css('color', '#C75D5D');

}



function isEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase());
}
formulario.addEventListener("submit", function(e){
    checkInputs();
    if(Object.keys(errores).length>0){
        e.preventDefault();
    }
    
    
})

function checkInputs(){
    const firstnameValue = firstname.value.trim();
    if(firstnameValue === ""){
        setError(firstname, 'El campo no puede estar vacío')
    }else{
        setSuccess(firstname)
    };

    const surnameValue = surname.value.trim();
    if(surnameValue === ""){
        setError(surname, 'El campo no puede estar vacío')
    }else{
        setSuccess(surname)
    }

    const emailValue = email.value.trim();
    if(emailValue === ""){
        setError(email, 'El campo no puede estar vacío')
    }else if(!isEmail(emailValue)){
        setError(email, 'El email es inválido')
    }else{
        setSuccess(email)
    }
    const passValue = pass.value.trim();
    const pass2Value = pass2.value.trim();
    if(passValue === ""){
        setError(pass, 'El campo no puede estar vacío')
    }else if(passValue != pass2Value){
        setError(pass, '')
    }else{
        setSuccess(pass)
    }

    
    if(pass2Value === ""){
        setError(pass2, 'El campo no puede estar vacío')
    }else if(passValue != pass2Value){
        setError(pass2, 'Las contraseñas deben coincidir')
    }else{
        setSuccess(pass2)
    }


}

function setError(input, message){
    let formControl = input.parentElement
    let small = formControl.querySelector('small')
    small.innerText = message
    formControl.className = "form-control error"
    errores[input.name] = message
    console.log(errores);
}

function setSuccess(input){
    let formControl = input.parentElement
    let small = formControl.querySelector('small')
    small.innerText = ""
    formControl.className = "form-control success"
    delete errores[input.name]
}