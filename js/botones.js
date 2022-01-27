//----- ACCESO A LOS ELEMENTOS DEL DOM -----

var botonEncriptar = document.querySelector("#btn-encriptar");
var botonDesencriptar = document.querySelector("#btn-desencriptar");

var botonCopiarE = document.querySelector("#btn-copy-E");
var botonPegarE = document.querySelector("#btn-paste-E");

var botonCopiarD = document.querySelector("#btn-copy-D");
var botonPegarD = document.querySelector("#btn-paste-D");

var botonLimpiar = document.querySelector("#btn-limpiar");

var formulario = document.querySelector("#formulario");
var mensajeEncriptado = document.querySelector("#msg");
var inputFormulario = document.querySelector("#input-texto");

    //<<<<< MENSAJES DE ERRORES >>>>>

var errorSpan = document.querySelector("#span-error");

var copiarError = document.querySelector("#error-copiar");
    
//----- REGISTRO DE EVENTOS PARA LOS BOTONES -----

botonEncriptar.addEventListener("click", function(event) {
    event.preventDefault();

    var textoInput = recibirTextoFormulario(formulario);

    mensajeEncriptado.value = "";

    setTimeout(function(){errorSpan.innerHTML = ""}, 3000);
    
    //<<<<< VALIDACION CAMPO VACIO >>>>>
    
    if (textoInput.length == 0 || (/^\s*$/.test(textoInput))) {
         
        //<<<<< MOSTRAR MENSAJES DE ERRORES SI NO HAY TEXTO >>>>>

        errorSpan.textContent = "* Debes Ingresar un texto";
        errorSpan.classList.remove("mensaje-correcto");
        errorSpan.classList.add("mensaje-error");
        
    } else {

    //<<<<< VALIDACION MAYÚSCULAS Y CARACTERES ESPECIALES >>>>>        

        if (comprobarMayusculas(textoInput)) {

            //<<<<< MOSTRAR MENSAJE DE ERROR SI HAY MAYÚSCULAS O CARACTERES ESPECIALES >>>>>

            errorSpan.textContent = "* Solo debe ingresar letras minusculas, no se admiten caracteres especiales ni acentos.";
            errorSpan.classList.remove("mensaje-correcto");
            errorSpan.classList.add("mensaje-error");

        } else {

            mensajeEncriptado.value = encriptarTexto(textoInput);
            errorSpan.textContent = "* Texto encriptado";
            errorSpan.classList.remove("mensaje-error");
            errorSpan.classList.add("mensaje-correcto");

        }
    }
})


botonDesencriptar.addEventListener("click", function(event) {
    event.preventDefault();

    var textoInput = recibirTextoFormulario(formulario);

    mensajeEncriptado.value = "";

    setTimeout(function(){errorSpan.innerHTML = "";}, 3000);;
    

    if(textoInput.length == 0 || (/^\s*$/.test(textoInput))) {

        errorSpan.textContent = "* Debes Ingresar un texto";
        errorSpan.classList.add("mensaje-error");

    } else {

        if (comprobarMayusculas(textoInput)) {
            errorSpan.innerHTML = "* Solo debe ingresar letras minusculas, no se admiten caracteres especiales ni acentos.";
            errorSpan.classList.add("mensaje-error");

        } else {

            mensajeEncriptado.value = desencriptarTexto(textoInput);
            errorSpan.classList.remove("mensaje-error");
            errorSpan.textContent = "* Texto desencriptado";
            errorSpan.classList.add("mensaje-correcto");

        }
    }
})

botonCopiarE.addEventListener("click",function(event) {
    event.preventDefault();

    inputFormulario.focus();
    setTimeout(function(){errorSpan.textContent = ""}, 3000);;

    if (inputFormulario.value.length == 0 || (/^\s*$/.test(inputFormulario.value))) {

        errorSpan.textContent = "* No hay texto para copiar";
        errorSpan.classList.remove("mensaje-correcto");
        errorSpan.classList.add("mensaje-error");
        
    } else {

        navigator.clipboard.writeText(inputFormulario.value);
        errorSpan.textContent = "* Texto copiado";
        errorSpan.classList.remove("mensaje-error");
        errorSpan.classList.add("mensaje-correcto");

    }
})



botonCopiarD.addEventListener("click",function(event) {
    event.preventDefault();

    setTimeout(function(){copiarError.textContent = ""}, 3000);

    if (mensajeEncriptado.value.length == 0 || (/^\s*$/.test(mensajeEncriptado))) {

        copiarError.textContent = "* No hay texto para copiar";
        copiarError.classList.remove("mensaje-correcto");
        copiarError.classList.add("mensaje-error");

    } else {

        navigator.clipboard.writeText(mensajeEncriptado.value);
        copiarError.textContent = "* Texto copiado";
        copiarError.classList.remove("mensaje-error");
        copiarError.classList.add("mensaje-correcto");
    
    }
})

botonPegarD.addEventListener("click",function(event) {
    event.preventDefault();
    
    navigator.clipboard.readText().then(clipText =>
        mensajeEncriptado.value = clipText);

})

botonPegarE.addEventListener("click",function(event) {
    event.preventDefault();
    
    navigator.clipboard.readText().then(clipText =>
        inputFormulario.value = clipText);

})

botonLimpiar.addEventListener("click",function(event) {
    event.preventDefault();

    mensajeEncriptado.value = "";

});

//----- DEFINICION DE FUNCIONES -----

function recibirTextoFormulario(formulario) {
    var frase = formulario.texto.value;
    return frase;
}

function comprobarMayusculas(frase) {

    var letras = /[^a-z \s]/;
    var resultado = letras.test(frase);

    return resultado;

}
