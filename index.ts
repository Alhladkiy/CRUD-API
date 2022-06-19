
// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http');
const port = process.env.PORT || 3000;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const users = require('./src/data/users')

const server = http.createServer((req: any, res: any): void => {
    if (req.url === '/api/users' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application.json'});
        res.end(JSON.stringify(users));
    } else {
        res.writeHead(404, {'Content-Type': 'application.json'});
        res.end(JSON.stringify({
            message: 'Route not found' 
        }));
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

