const http = require('http');
const server = http.createServer();

var fs = require("fs");
const html = fs.readFileSync('page.html');
const css = fs.readFileSync('style.css');
const js = fs.readFileSync('script.js');

function start() {
    // Обработка запросов от сервера
    server.on('request', (request, response) => {
        switch (request.url) {
            case '/':
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(html);
                console.log(">Incoming request for page.html");
                break;

            case '/style.css':
                response.writeHead(200, { 'Content-Type': 'text/css' });
                response.end(css);
                console.log(">Incoming request for style.css");
                break;

            case '/script.js':
                response.writeHead(200, { 'Content-Type': 'text/javascript' });
                response.end(js);
                console.log(">Incoming request for script.js");
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

    server.listen(1337, () => console.log(">Server has started"));
}

exports.start = start;