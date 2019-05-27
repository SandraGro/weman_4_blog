/** Este archivo se usará para poner funciones de ejemplo para llamadas asíncronas
 * Aunque no vienen pensadas en ejercicio original, es bueno pensarlas de una vez.
 */
function peticionAsync(tipo, url, parametros) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (ajax.status == 200) {
                //El resultado es exitoso!
                //Tomar las acciones necesarias aquí
                let resp= JSON.parse(ajax.responseText);
                if(resp.error =="0"){
                    if(url=='/comentarios'){
                        dibujaPublicaciones(resp.registros);
                    }
                }
            } else if (ajax.status == 404) {
                //No encontró el servicio o API
            } else {
                //Una respuesta inesperada por parte del servidor
                alert('Saliendo precipitadamente de la aldea por culpa de la escaces de rinocerontes');
            }
        }
    };
    //El tipo puede ser GET, POST, PUT, DELETE o cualquier tipo aceptado por HTTP
    //La URL es a dondo hará la petición...
    //Por último, el "true" indica que es una petición asíncrona
    ajax.open(tipo, url, true);
    //Se establece cómo será enviado el contenido.
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //La función encodeURI se encarga que la petición tenga el formato adecuado para ser enviado...
    //un ejemplo de petición puede ser variable=valor&otravariable=otrovalor...
    ajax.send(encodeURI(parametros));
}

function leerPublicaciones() {
    peticionAsync('GET', '/comentarios', '');
}

function dibujaPublicaciones(publis) {
    let contenedor = document.getElementsByClassName('post-container')[0];
    for (let i = 0; i < publis.length; i++) {
        let nuevaPublicacion = '<div class="post-container">\
        <div class="post"' + publis[i].id + '>\
            <div class="date-container"><small> '+ publis[i].momento + '</small></div>\
            <h2 class="post-title">'+ publis[i].titulo + '</h2>\
            <p> '+ publis[i].contenido + '</p>\
            <em class="autor"> '+ publis[i].idusuario + '</em>\
            </div>\
            <div class="image">\
                <img class="img-post" src="img/javascript.jpg">\
            </div>\
    </div>';
        contenedor.innerHTML += nuevaPublicacion;
    }

    /* forEach for(let laPublicacion :publis)*/
}

var form = document.getElementById('signLog');
var data = new FormData(form);
console.log(data);
var req = new XMLHttpRequest();
req.send(data);

