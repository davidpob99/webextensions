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
  var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.trafikoa.eus/servicios/IncidenciasTDT/IncidenciasTrafikoTDTGeo");
    xhr.addEventListener("load",function(){
        var data = xhr.responseXML;
        var datos = xml2json(data);
        datos = datos.replace('undefined', '');
        var json = JSON.parse(datos);
        // console.log(json);
        document.getElementById("tarjetas").innerHTML="";
        // console.log("Completado sin errores");
        for(var i in json.raiz.incidenciaGeolocalizada) {
          if(json.raiz.incidenciaGeolocalizada[i].matricula == id){
            var tarjetas = document.getElementById("tarjetas");
            var tarjeta = document.createElement("DIV");
            tarjeta.setAttribute("class", "tarjeta");
            tarjeta.setAttribute("id", "tarjeta");
            tarjetas.appendChild(tarjeta);

            if(json.raiz.incidenciaGeolocalizada[i].carretera != null){
                var titulotarjeta = document.createElement("H2");
                titulotarjeta.setAttribute("id", "titulo");
                titulotarjeta.appendChild(document.createTextNode(json.raiz.incidenciaGeolocalizada[i].carretera));
                tarjeta.appendChild(titulotarjeta);
            }

            if(json.raiz.incidenciaGeolocalizada[i].poblacion != null){
                var subtitulotarjeta = document.createElement("DIV");
                subtitulotarjeta.appendChild(document.createTextNode(json.raiz.incidenciaGeolocalizada[i].poblacion));
                tarjeta.appendChild(subtitulotarjeta);
            }

            var cuerpotarjeta = document.createElement("DIV");

            if(json.raiz.incidenciaGeolocalizada[i].tipo != null){
                var tipo = document.createElement("P");
                tipo.appendChild(document.createTextNode("Tipo de alerta: " + json.raiz.incidenciaGeolocalizada[i].tipo))
                cuerpotarjeta.appendChild(tipo);
            }

            if(json.raiz.incidenciaGeolocalizada[i].causa != null && json.raiz.incidenciaGeolocalizada[i].causa != "Desconocida"){
                var causa = document.createElement("P");
                causa.appendChild(document.createTextNode("Causa: " + json.raiz.incidenciaGeolocalizada[i].causa))
                cuerpotarjeta.appendChild(causa);
            }


            if(json.raiz.incidenciaGeolocalizada[i].sentido != "NO DISPONIBLE"){
                var calzada = document.createElement("P");
                calzada.appendChild(document.createTextNode("Sentido: " + json.raiz.incidenciaGeolocalizada[i].sentido))
                cuerpotarjeta.appendChild(calzada);
            }

            if(json.raiz.incidenciaGeolocalizada[i].nivel != null){
                var nivel = document.createElement("P");
                nivel.appendChild(document.createTextNode("Nivel: " + json.raiz.incidenciaGeolocalizada[i].nivel))
                cuerpotarjeta.appendChild(nivel);
            }

            if(json.raiz.incidenciaGeolocalizada[i].pk_inicial != 0.00 && json.raiz.incidenciaGeolocalizada[i].pk_final != 0.00){
                var km = document.createElement("P");
                km.appendChild(document.createTextNode("Del km " + json.raiz.incidenciaGeolocalizada[i].pk_inicial + " al km " + json.raiz.incidenciaGeolocalizada[i].pk_final))
                cuerpotarjeta.appendChild(km);
            }

            if(json.raiz.incidenciaGeolocalizada[i].fechahora_ini != null){
                var fecha = document.createElement("P");
                fecha.appendChild(document.createTextNode("Fecha y hora de inicio de la incidencia: " + json.raiz.incidenciaGeolocalizada[i].fechahora_ini))
                cuerpotarjeta.appendChild(fecha);
            }

            tarjeta.appendChild(cuerpotarjeta);


            var espacio =  document.createElement("BR");
            tarjetas.appendChild(espacio);
            localStorage.setItem("id",id);

          }}});
    xhr.send();
}
