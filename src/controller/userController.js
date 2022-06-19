const User = require('../handler/helpers');

async function getUsers(req, res) {
    try  {
        const users = await User.showUsers();
        res.writeHead(200, {'Content-Type': 'application.json'});
        res.end(JSON.stringify(users));
    }
    catch(err) {
        console.log(err)
    } 
} 

async function getUser(req, res, id) {
    try  {
        const user = await User.showUser(id);
        if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                message: 'Users not found'
            }));
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
        }
    }
    catch(err) {
        console.log(err)
    } 
} 

async function createUser(req, res) {
    try  {
        let body = '';
        req.on('data', (chunk) => {
            body + chunk.toString();
        })
        req.on('end', async () => {
            const {id, username, age, hobbies} = JSON.parse(body);
            const user = {
                id: id,
                username: username,
                age: age,
                hobbies: hobbies
            }
            const newUser = User.create(user);
            res.write(201, {'Content-Type':'application/json'})
            return res.end(JSON.stringify(newUser));
        })

      
    }
    catch(err) {
        console.log(err)
    } 
} 


async function deleteUser(req, res, id) {
    try  {
        const user = await User.showUser(id);
        if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                message: 'Users not found'
            }));
        } else {
            await User.remove(id)
            res.writeHead(204, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                message: `User ${id} removed`
            }));
        }
    }
    catch(err) {
        console.log(err)
    } 
} 

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser
}


