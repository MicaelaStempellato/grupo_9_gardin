window.addEventListener("load", ()=>{
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    switch(secondLevelLocation){
        case 'products':
            if(pathArray[2]== 'create'){
                document.querySelector("#navbarCreate").classList.add("estoy_aca");
            }else{document.querySelector("#navbarProducts").classList.add("estoy_aca");}
        
        break;
        case 'contact':
        document.querySelector("#navbarContact").classList.add("estoy_aca");
        break;
        case 'help':
        document.querySelector("#navbarHelp").classList.add("estoy_aca");
        break;
        case 'news':
        document.querySelector("#navbarPromociones").classList.add("estoy_aca");
        break;
        default:
        document.querySelector("#navbarHome").classList.add("estoy_aca");

    }
        
})