var http = require("http");
var fs = require("fs");

var page = fs.readFileSync('page.html');

http.createServer(function (request, response) {
    console.log("Request received");

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(page);

    response.end();
}).listen(1337); console.log("Server has started")