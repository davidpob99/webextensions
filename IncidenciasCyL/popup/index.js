var select = document.getElementById("municipio");
select.addEventListener("change",function(){
  var id = select.value;  
  obtener_datos(id);
});

window.addEventListener("load",function(){
  var id = localStorage.getItem("id"); 
  select.value = id;
  obtener_datos(id);
});

function obtener_datos(id) {
  localStorage.setItem("id",id);
  $.getJSON("http://servicios.jcyl.es/InviPublica/OpenData?formato=json", function(json){
    })
    .done(function(data) {      
      document.getElementById("tarjetas").innerHTML="";
      document.getElementById("fecha").innerHTML="";
      console.log("Completado sin errores");
      console.log(data.fecha);
      document.getElementById("fecha").appendChild(document.createTextNode("Datos actualizados a: "+ data.fecha));
      //ocument.getElementById("fecha").innerHTML = "Datos actualizados a: "+ data.fecha;      
      for(var i in data.incidencias) {
        if(data.incidencias[i].Provincia == id){
          var tarjetas = document.getElementById("tarjetas");
          var tarjeta = document.createElement("DIV");
          tarjeta.setAttribute("class", "tarjeta mdl-card mdl-shadow--2dp");
          tarjeta.setAttribute("id", "tarjeta");
          tarjetas.appendChild(tarjeta);

          var titulotarjeta = document.createElement("H2");
          titulotarjeta.setAttribute("class", "mdl-card__title-text");
          titulotarjeta.setAttribute("id", "titulo");
          titulotarjeta.appendChild(document.createTextNode(data.incidencias[i].Via));
          tarjeta.appendChild(titulotarjeta);

          var subtitulotarjeta = document.createElement("DIV");
          subtitulotarjeta.setAttribute("class", "mdl-card__subtitle-text");
          subtitulotarjeta.appendChild(document.createTextNode(data.incidencias[i].Tramo));
          tarjeta.appendChild(subtitulotarjeta);

          var cuerpotarjeta = document.createElement("DIV");
          cuerpotarjeta.setAttribute("class", "mdl-card__supporting-text");          

          var tipo = document.createElement("P");
          tipo.appendChild(document.createTextNode("Tipo de alerta: " + data.incidencias[i].Tipo))
          cuerpotarjeta.appendChild(tipo);
          
          var causa = document.createElement("P");
          causa.appendChild(document.createTextNode("Causa: " + data.incidencias[i].Causa))
          cuerpotarjeta.appendChild(causa);

          var calzada = document.createElement("P");
          calzada.appendChild(document.createTextNode("Calzada: " + data.incidencias[i].Calzada))
          cuerpotarjeta.appendChild(calzada);

          var observaciones = document.createElement("P");
          observaciones.appendChild(document.createTextNode("Observaciones: " + data.incidencias[i].Observaciones))
          cuerpotarjeta.appendChild(observaciones);

          var km = document.createElement("P");
          km.appendChild(document.createTextNode("Del km " + data.incidencias[i].PKInicio + " al km " + data.incidencias[i].PKFin))
          cuerpotarjeta.appendChild(km);

          tarjeta.appendChild(cuerpotarjeta);

          var enlacetarjeta = document.createElement("DIV");
          enlacetarjeta.setAttribute("class", "mdl-card__actions mdl-card--border");
          tarjeta.appendChild(enlacetarjeta);

          var enlacetarjeta2 = document.createElement("A");
          enlacetarjeta2.setAttribute("class", "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect");
          enlacetarjeta2.setAttribute("href", data.incidencias[i].MasInfo);
          enlacetarjeta2.innerHTML = "Más información";
          tarjeta.appendChild(enlacetarjeta2);

          var espacio =  document.createElement("BR");
          tarjetas.appendChild(espacio);
        }
      }
    })
    .fail(function() {
      console.log("Error");
      alert("No se pueden obtener los datos. Inténtelo de nuevo en unos minutos");
    }) ;     
}