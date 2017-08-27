var j, k, l;
const url = "http://orienteeringonline.net/"
l = 0;

window.addEventListener("load",function(){    
   obtener_datos();
});

function obtener_datos() {  
    $.getJSON("http://oonline.azurewebsites.net/", function(json){
    })
    .done(function(data) {      
      document.getElementById("tarjetas").innerHTML="";      
      // console.log("Completado sin errores");
      // console.log(data);  
      for(var i = 0 ; i < data.competitions.length/3 ; i+=3) {
          l++;
          j = i+1;
          k = i+2;
          var tarjetas = document.getElementById("tarjetas");
          var tarjeta = document.createElement("DIV");
          tarjeta.setAttribute("class", "tarjeta");
          tarjeta.setAttribute("id", "tarjeta");
          tarjetas.appendChild(tarjeta);

          var titulotarjeta = document.createElement("H2");          
          titulotarjeta.setAttribute("id", "titulo");
          titulotarjeta.appendChild(document.createTextNode(data.competitions[k]));
          tarjeta.appendChild(titulotarjeta);

          var subtitulotarjeta = document.createElement("DIV");          
          subtitulotarjeta.appendChild(document.createTextNode("Date: " + data.competitions[i]));
          tarjeta.appendChild(subtitulotarjeta);

          var cuerpotarjeta = document.createElement("DIV");                 

          var tipo = document.createElement("P");
          tipo.appendChild(document.createTextNode("Country: " + data.competitions[j]))
          cuerpotarjeta.appendChild(tipo);
          
          tarjeta.appendChild(cuerpotarjeta);

          var enlacetarjeta = document.createElement("DIV");
          enlacetarjeta.setAttribute("class", "mdl-card__actions mdl-card--border");
          tarjeta.appendChild(enlacetarjeta);

          var enlacetarjeta2 = document.createElement("A");          
          enlacetarjeta2.setAttribute("href", url + data.links[l]);
          enlacetarjeta2.innerHTML = "More details";
          tarjeta.appendChild(enlacetarjeta2);

          var espacio =  document.createElement("BR");
          tarjetas.appendChild(espacio);        
      }       
    })
    .fail(function() {
      // console.log("Error");
      alert("No se pueden obtener los datos. Inténtelo de nuevo en unos minutos");
    });  
}