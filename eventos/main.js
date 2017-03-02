function saludar()
{
    alert("Hola eventos");
}
function saludar2(){
    document.write('hola documento');
}

var btnSaluda = document.getElementById("btn-saluda");
btnSaluda.onclick = saludar;

var btnSaluda2 = document.getElementById("btn-saluda2");
btnSaluda2.addEventListener("click",saludar);
btnSaluda2.addEventListener("click",saludar2);