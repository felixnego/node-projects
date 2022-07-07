const http = require('http');


const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/friends') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            id: 1,
            name: 'Sir Issac Newton'
        }));
    } else if (req.url === '/message') {
        res.write('<html lang="">');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello There</li>');
        res.write('</ul>');
        res.write('<body>');
        res.write('</html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end()
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`)
});  // 127.0.0.1 => localhost