var abi = [
  {
    constant: true,
    inputs: [],
    name: "get",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "x",
        type: "uint256"
      }
    ],
    name: "set",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];
var addressContrato = "0xf2581bc645e5cc9210103d037eb9ed9196cf82c7";
var funciones = "";
/*
function ts2date(ts){ // función que convierte timestamp a fecha.
 
	var a = new Date(ts * 1000);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	return time;
 
}*/
//window.setInterval("leerMensajes()", 2000); // busca nuevos mensajes cada 2 segundos...

var web = null;
window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
    console.log("entro 1");
    web = web3;
    var contrato = web3.eth.contract(abi);
    funciones = contrato.at(addressContrato);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    web = web3;
    console.log("entro 2");
  }
});

function escribir() {
  var x = $("input[name=mensaje").val(); // obtengo el valor del input
  if (x.length > 0) {
    funciones.set(x, function(error, respuesta) {
      // intento escribir el mensaje. Se o Metamask pidiendo firmar la transacción...
	console.log(error);
	console.log(respuesta);
      if (error) throw error; // error, no se firmó la transacción
      alert("Mensaje enviado!!"); //...
    });
  }
}


function leer() {
  // función para leer los mensajes del contrato
 // console.log("buscando 1");
  jQuery("div#contenido").html(""); // limpiamos el div#contenido con los mensajes antes de volver a cargarlos
  funciones.get(function(error, respuesta) {
    // llamo la variable pública contadorMensajes del contrato...
	console.info(error);
    console.info(respuesta);
    if (error) throw error;
    //contadorMensajes = respuesta.c[0]; // guardo el número de mensajes publicados
  });
  /*for (var i = 0; i < contadorMensajes; i++) {
    // recorro de 0 hasta contadorMensajes
    funciones.mensajes(i, function(error, respuesta) {
      // cargo los mensajes desde 0 a contadorMensajes

      if (error) throw error;
      // respuesta es un array con la estructura Mensaje de Solidity:
      //índice 0: emisor;
      //índice 1: mensaje;
      //índice 2: fechaPublicacion;

      var emisor = respuesta[0];
      var mensaje = respuesta[1].replace("<", ""); // evitamos XSS
      mensaje = mensaje.replace(">", ""); // evitamos XSS
      var fechaPublicacion = respuesta[2];

      jQuery(
        "<b>Emisor</b>: " +
          emisor +
          "<br /><b>Mensaje</b>: " +
          mensaje +
          "<br /><b>Fecha</b>: " +
          ts2date(fechaPublicacion) +
          "<hr/>"
      ).appendTo("#contenido"); // cargo la estructura del mensaje en el div #contenido...
    });
  }*/
}
