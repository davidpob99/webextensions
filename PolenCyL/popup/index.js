var select = document.getElementById("municipio");
select.addEventListener("change",function(){
  var id = select.value;
  RemoveRow();
  obtener_datos(id);
});

window.addEventListener("load",function(){
  var id = localStorage.getItem("id"); 
  RemoveRow();
  select.value = id;
  obtener_datos(id);
});

function obtener_datos(id) {
  var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://opendata.jcyl.es/ficheros/inpo/polen_actual.xml");
    xhr.addEventListener("load",function(){        
        var data = xhr.responseXML; 
        var datos = xml2json(data);  
        datos = datos.replace('undefined', '');
        var json = JSON.parse(datos);    
        console.log(json.document.date);                
        // console.log(json);        
        var root = json.document.list.element.estacion[id];
        console.log(root.nombre);
        var longitud = root.tipo_polinico.length;
        console.log(longitud);  
        // Crear tabla
        var tabla = document.getElementById('tabla');        
        var tblHead = document.createElement("thead");
        var hilera = document.createElement("tr");
        var celda1 = document.createElement("td");
        var textoCelda1 = document.createTextNode("Tipo");
        celda1.appendChild(textoCelda1);
        var celda2 = document.createElement("td");
        var textoCelda2 = document.createTextNode("Nivel actual");
        celda2.appendChild(textoCelda2);
        var celda3 = document.createElement("td");
        var textoCelda3 = document.createTextNode("Nivel previsto");
        celda3.appendChild(textoCelda3);
        hilera.appendChild(celda1);
        hilera.appendChild(celda2);
        hilera.appendChild(celda3);
        tblHead.appendChild(hilera);
        tabla.appendChild(tblHead);
        var tblBody = document.createElement("tbody");
        // Crea las celdas
        for (var i = 0; i < longitud; i++) {
            // Crea las hileras de la tabla
            var hilera = document.createElement("tr");
         
            for (var j = 0; j < 3; j++) {
              // Crea un elemento <td> y un nodo de texto, haz que el nodo de
              // texto sea el contenido de <td>, ubica el elemento <td> al final
              // de la hilera de la tabla
              var celda = document.createElement("td");
              if(j==0){
                var textoCelda = document.createTextNode(root.tipo_polinico[i].nombre);
              }
              if(j==1){
                var textoCelda = document.createTextNode(root.tipo_polinico[i].valor_real);
              }
              if(j==2){
                var textoCelda = document.createTextNode(root.tipo_polinico[i].valor_previsto);
              }
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
            }         
            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
          }         
          // posiciona el <tbody> debajo del elemento <table>
          tabla.appendChild(tblBody);
          localStorage.setItem("id",id);        
        });
    xhr.send();
}

function RemoveRow () {
  var table = document.getElementById ("tabla");
  while(table.rows.length > 0) {
    table.deleteRow(0);
  }     
}