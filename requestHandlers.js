var exec = require("child_process").exec;
var querystring = require("querystring");

function listaFicheros(response, postData) {
	console.log("Manipulador de petición 'listaFicheros' ha sido llamado.");

	exec("ls -lah", function (error, stdout, stderr) {
		response.writeHead(200, {"Content-TYpe": "text/html"});
		response.write(stdout);
		response.end();
	});
}

function iniciar(response, postData) {
	console.log("Manipulador de peticiones 'iniciar' fué llamado");

	var body = "<html>" +
		"<head>" +
		"<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />" +
		"</head>" +
		"<body>" +
		"<form action='/subir' method='post'>" +
		"<textarea name='text' rows='20' cols='60'></textarea>" +
		"<input type='submit' value='Enviar texto' />" +
		"</form>" +
		"</body>" +
		"</html>";

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}
function subir(response, dataPosteada) {
	console.log("Manipulador de petición 'subir' ha sido llamado.");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("Tu enviaste el texto: "+ querystring.parse(dataPosteada)["text"]);
	response.end();
}

exports.listaFicheros;
exports.iniciar= iniciar;
exports.subir= subir;
