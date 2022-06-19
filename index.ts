
// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http');
const port = process.env.PORT || 3000;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const users = require('./src/data/users')

const server = http.createServer((req: any, res: any): void => {
    if (req.url === '/api/users' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application.json'});
        res.end(JSON.stringify(users));
    } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split('/')[3];
        const user = users.find((item) => item.id === id)
        if (!user) {
            res.writeHead(400, {'Content-Type': 'application.json'});
            res.end(JSON.stringify({
                message: 'Users not found'
            }));
        } else {
            res.writeHead(200, {'Content-Type': 'application.json'});
            res.end(JSON.stringify(user));
        }
    } 
    else {
        res.writeHead(404, {'Content-Type': 'application.json'});
        res.end(JSON.stringify({
            message: 'Route not found' 
        }));
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

