var pila = [];
var buffer ="";

inicializa();

function inicializa()
{
    var botones = document.getElementsByTagName("button");
    var boton;

    for(var i=0; i < botones.length ; i++)
    {
        boton = botones[i];
        boton.value = boton.innerText;
        boton.onclick = function (){
            buffer += this.value;
            document.getElementById("resultado").innerText=buffer;
            agrega_a_pila(this.value);
        }
    }
}

function agrega_a_pila(caracter)
{
    var anterior = '';

    if(pila.length>0)
         anterior = pila.pop();    

    if(anterior == '+' || anterior == '-' || anterior == '*' || anterior == '/')
    {
        if(caracter == '*' || caracter == '/')
        {
            pila.push(anterior);
            pila.push(caracter);
        }
        else{
            agrega_a_pila(caracter);
            pila.push(anterior);
        }
    }
    else{
        pila.push(caracter);
        if(anterior!='')
            pila.push(anterior);
    }
}