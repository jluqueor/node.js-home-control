var https = require("https");
var url = require("url");
const fs = require("fs");

function iniciar(route, handle) {
	function onRequest(request, response) {
		var dataPosteada="";
		var pathname = url.parse(request.url).pathname;
		console.log("Petición para "+pathname+" recibida.");

		request.setEncoding("utf8");

		request.addListener("data",function(trozoPosteado) {
			dataPosteada += trozoPosteado;
			console.log("Recibido trozo POST '"+trozoPosteado+"'.");
		});

		request.addListener("end", function() {
			route(handle, pathname, response, dataPosteada);
		});
	}
	https.createServer(
		{
			key: fs.readFileSync("../certificate/server.key"),
			cert: fs.readFileSync("../certificate/server.cert")},
		onRequest
	).listen(10443, "0.0.0.0");
	console.log("Servidor Iniciado");
}

exports.iniciar = iniciar;

