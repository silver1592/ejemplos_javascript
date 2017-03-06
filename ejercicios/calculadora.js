var pila = [];
var buffer ="";
var posfija;

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

    posfija = false;
}

function convierteAPosfija(caracter)
{
    var anterior = '';

    if(pila.length==0)
        pila.push(caracter);
    else
    {
        //se resuelve la operacion de alta prioridad
        if(esNumero(caracter) && hayOperadoresAltos())
            realizaOperacionAlta(caracter);
        else
        {
            anterior = pila.pop();
            if(esOperadorBajo(caracter))
            {
                pila.push(anterior);
                pila.push(caracter);
                pila.push(undefined);
            }
            else if(esNumero(anterior))
            {
                pila.push(anterior);
                pila.push(caracter);
            }
            else if(esOperadorAlto(caracter))
            {
                agrega_a_pila(caracter)
                pila.push(anterior);
            }
            else if(anterior==undefined)
            {
                if(esNumero(caracter))
                {
                    anterior = pila.pop();
                    pila.push(caracter);
                    pila.push(anterior);
                }
                else
                    pila.push(caracter);
            }
            else 
            {
                pila.push(anterior);
                pila.push(caracter);
            }
        }
    }
}

function agrega_a_pila(caracter)
{
    if(caracter=='AC')
    {
        pila =[];
        buffer="";
        document.getElementById("resultado").innerText=buffer;
    }
    else if(caracter!="=")
    {
        if(posfija || (pila.length==1 && esNumero(caracter)))
        {
            pila.push(caracter);
            posfija=true;
        }
        else
        {
            convierteAPosfija(caracter);
        }
    }
    else
    {
        buffer = realizaPosfija(pila);
        document.getElementById("resultado").innerText=buffer;
    }
}

function esOperadorAlto(caracter)
{
    if(caracter == '/' || caracter == '*')
        return true;
    else
        return false;
}

function esOperadorBajo(caracter)
{
    if(caracter == '+' || caracter == '-')
        return true;
    else
        return false;
}

function esNumero(caracter)
{
    if(caracter != '+' && caracter != '-' && caracter != '*' && caracter != '/' && caracter!= undefined)
        return true;
    else
        return false;
}

function hayOperadoresAltos()
{
    for(var i = 0; i<pila.length; i++)
        if(esOperadorAlto(pila[i]))
            return true;

    return false;
}

function realizaOperacionAlta(numero)
{
    var arAux = [];
    var vAux;
    var num0;

    do{
        if(vAux!=undefined)
            arAux.push(vAux);
        vAux=pila.pop();
    }while(!esOperadorAlto(vAux));

    num0=pila.pop();
    num0 = parseFloat(num0);
    numero = parseFloat(numero)

    if(vAux=="*")
        pila.push((num0*numero).toString());
    else
        pila.push((num0/numero).toString());

    while(arAux.length!=0){
        vAux = arAux.pop();
        pila.push(vAux);
    }
}

function realizaPosfija()
{
    var op;
    var num1;
    var num2;
    var res;

    if(pila.length>1)
    {
        op = pila.pop();
        if(esNumero(op))
            return "ERROR";

        num1 = buscaNum();
        num2 = buscaNum();

        if(num1=="ERROR" || num2=="ERROR")
            return "ERROR";

        num1 = parseInt(num1);
        num2 = parseInt(num2);

        if(op=='+')
            res = (num1+num2).toString();
        else if (op == '-')
            res = (num2-num1).toString();
        else if (op == '*')
            res = (num2*num1).toString();
        else
            res = (num2/num1).toString();

        return res;
    }

    return pila[0];
}

function buscaNum()
{
    var num1;

    num1 = pila.pop();
    if(!esNumero(num1))
    {
        pila.push(num1);
        num1 = realizaPosfija(pila);
    }
    
    if(num1 == "ERROR")
        return num1;

    return num1;
}