const http = require('http');
const server = http.createServer();

var fs = require("fs");
const html = fs.readFileSync('page.html');
const css = fs.readFileSync('style.css');
const js = fs.readFileSync('script.js');

function start() {
    server.on('request', (request, response) => {
        if (request.method == 'POST') {
            response.end("image");
        } else {
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

                case '/image':
                    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    let image = fs.readFileSync("IMG/Sharks/Shark-3.jpg");
                    response.end(image);
                    console.log(">Incoming request for image");
                    break;

                case '/favicon.ico':
                    break;

                default:
                    var type = request.url.split("?");

                    if (type[0] == '/image') {
                        var parts = type[1].split("&");
                        var path;
                        console.log("Image: " + parts);

                        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        let image = fs.readFileSync("IMG/" + parts[0] + "/" + parts[0] + "-" + parts[1] + ".jpg");
                        response.end(image);
                    }
                    break;
            }
        }
    });

    server.listen(1337, () => console.log(">Server has started"));
}

exports.start = start;