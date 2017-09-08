var j, k, l, t;
const url = "http://orienteeringonline.net/"
const e_name = "http://orienteeringonline.net/ListOfEntries.aspx?ListType=1&CompetitionID=";
const e_class = "http://orienteeringonline.net/ListOfEntries.aspx?ListType=2&CompetitionID=";
const e_club = "http://orienteeringonline.net/ListOfEntries.aspx?ListType=3&CompetitionID=";
const e_country = "http://orienteeringonline.net/ListOfEntries.aspx?ListType=4&CompetitionID=";
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
          tarjeta.appendChild(enlacetarjeta2);
          
          var boton = document.createElement("BUTTON");
          boton.innerHTML = "More details";
          enlacetarjeta2.appendChild(boton);
          
          t = data.links[l].substr(data.links[l].length - 4);  
          
          var enlacetarjeta3 = document.createElement("A");          
          enlacetarjeta3.setAttribute("href", e_name + t);          
          tarjeta.appendChild(enlacetarjeta3);
          
          var boton = document.createElement("BUTTON");
          boton.innerHTML = "Entries by name";
          enlacetarjeta3.appendChild(boton);
          
          var enlacetarjeta4 = document.createElement("A");          
          enlacetarjeta4.setAttribute("href", e_class + t);
          tarjeta.appendChild(enlacetarjeta4);
          
          var boton = document.createElement("BUTTON");
          boton.innerHTML = "Entries by class";
          enlacetarjeta4.appendChild(boton);
          
          var enlacetarjeta5 = document.createElement("A");          
          enlacetarjeta5.setAttribute("href", e_club + t);
          tarjeta.appendChild(enlacetarjeta5);
          
          var boton = document.createElement("BUTTON");
          boton.innerHTML = "Entries by club";
          enlacetarjeta5.appendChild(boton);
          
          var enlacetarjeta6 = document.createElement("A");          
          enlacetarjeta6.setAttribute("href", e_country + t);          
          tarjeta.appendChild(enlacetarjeta6);
          
          var boton = document.createElement("BUTTON");
          boton.innerHTML = "Entries by country";
          enlacetarjeta6.appendChild(boton);

          var espacio =  document.createElement("BR");
          tarjetas.appendChild(espacio);
   
	  l++;     
      }       
    })
    .fail(function() {
      // console.log("Error");
      alert("No se pueden obtener los datos. Inténtelo de nuevo en unos minutos");
    });  
}