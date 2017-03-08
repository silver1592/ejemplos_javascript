$(document).ready(function(){
    alert("Hola mundo")
    var eleDiv = $('<div>')
    var ele = $('<h1>*******Texto desde ready******** </h1>')

    ele.css("color","darkred");
    eleDiv.css("background-color","lightblue")
    eleDiv.css("text-align",'center')
    eleDiv.prepend(ele);
    $('p:first').before(eleDiv);
})