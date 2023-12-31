const http = require('http'); 
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Hello from Node.js</title></head>');
        res.write('<body><form action="/method" method="POST"><input type="TEXT" name="Message"><button>Send</button></body>');
        res.write('</html>');
        res.end();
    }
    if (url ==='/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<html>');
    // res.write('<head><title>My first Page</title></head>');
    // res.write('<body><h1>Hello from Node.js</h1>></body>');
    // res.write('</html>');
    // res.end();
});

server.listen(3000);
