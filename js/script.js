document.querySelector("form").addEventListener("submit",(event)=>{
    event.preventDefault();
})

const $date = document.querySelectorAll("[required]");

function ValidateField(field){
    function verifyErrors(){
        let foundError = false;

        for(let error in field.validity){
            if(field.validity[error] && !field.validity.valid){
               foundError = error 
            }
        }
        return foundError;
    }

    function customMessage(typeError){
        const messages = {
            text:{
                valueMissing: "Favor, Preencher este campo."
            },
            email:{
                valueMissing: "Email é obrigatório!!!",
                typeMismatch: "Preencha um e-mail válido."
            }
        }
        return messages[field.type][typeError]
    }

    function setCustomMessage(message){

        const spanError = field.parentNode.querySelector("span.error")
        
        if(message){
            spanError.classList.add("active");
            spanError.innerHTML = message;
        }else{
            spanError.classList.remove("active");
            spanError.innerHTML = "";
        }
    }
    return function(){
        const error = verifyErrors();

        if (error){
            //field.setCustomValidity("Esse Campo é Obrigatório!")
            const message = customMessage(error);
            setCustomMessage(message);
        }else{
            //field.setCustomValidity("")
            field.style.borderColor ="#200e29";
            setCustomMessage()            
        }
    };
}

for(fields of $date){
    fields.addEventListener("invalid",(event)=>{
        event.preventDefault();
        customValidation(event);
    });

    fields.addEventListener("blur", customValidation);
}

function customValidation(event){
    const field = event.target;
    const validation = ValidateField(field);
    validation();    
    const error = ValidateField(field);

}


