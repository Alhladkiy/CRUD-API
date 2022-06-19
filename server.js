
const http = require('http');
const { getUsers, getUser, createUser, deleteUser } = require('./src/controller/userController')

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url !== '/api/users') {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            message: 'Invalid url' 
        }));
    } else if (req.url === '/api/users' && req.method === 'GET') {
        getUsers(req, res); 
    } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split('/')[3];
        getUser(req, res, id);
    } else if (req.url === '/api/users' && req.method === 'POST') {
        createUser(req, res);
    } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "DELETE") {
        const id = req.url.split('/')[3];
        deleteUser(req, res, id)
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            message: 'Route not found' 
        }));
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})



