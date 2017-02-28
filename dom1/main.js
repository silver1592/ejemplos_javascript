document.writeln("Hola Javascript");

//cajas = document.getElementsByClassName("caja");
cajas = document.getElementsByTagName("div");

cajas[0].textContent="Hola Mundo";
cajas[1].innerHTML='<b>'+cajas[1].textContent+'</b>';