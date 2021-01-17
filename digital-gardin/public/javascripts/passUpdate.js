const passNew = document.querySelector("#pass");
const passNew2 = document.querySelector("#pass2");
const passOld = document.querySelector("#passOld");
const formulario = document.querySelector('form.contrasena');
var errores = {}

formulario.addEventListener("submit", function(e){
    checkInputs();
    if(Object.keys(errores).length>0){
        e.preventDefault();
    }
    
    
})


function checkInputs(){
    const passValue = passNew.value.trim();
    const pass2Value = passNew2.value.trim();
    const passOldValue = passOld.value.trim();

    if(passOldValue === ""){
        setError(passOld, 'El campo no puede estar vacío')
    }else if(passValue == passOldValue){
        setError(passOld, '')
    }else{
        setSuccess(passOld)
    }

    if(passValue === ""){
        setError(passNew, 'El campo no puede estar vacío')
    }else if(passValue == passOldValue){
        setError(passNew, 'La contraseña nueva no puede ser igual a la actual')
    }else if(passValue != pass2Value){
        setError(passNew, '')
    }else{
        setSuccess(passNew)
    }

    
    if(pass2Value === ""){
        setError(passNew2, 'El campo no puede estar vacío')
    }else if(passValue != pass2Value){
        setError(passNew2, 'Las contraseñas nuevas deben coincidir')
    }else if(pass2Value == passOldValue){
        setError(passNew2, '')
    }else{
        setSuccess(passNew2)
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