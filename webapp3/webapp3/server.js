var http = require("http");
var fs = require("fs");
var page = fs.readFileSync('page.html');

function start() {
    var server = http.createServer(function (request, response) {
        switch (request.url) {
            case '/':
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(page);
                response.end();
                break;

            case '/favicon.ico':
                break;

            default:
                var params = request.url.slice(1) + "";
                var size = params.split("&");
                console.log(">Incoming request with " + size.length + " params: " + size);
                break;
        }
    });

    server.listen(1337);
    console.log(">Server has started");
}

exports.start = start;