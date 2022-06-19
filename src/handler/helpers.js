let users = require('../data/users.json');
const { v4: uuidv4 } = require ('uuid');
const { writeDataToFile } = require('../utils/writeUsers')

function showUsers() {
    return new Promise((resolve, reject) => {
        resolve(users)
    })
}

function showUser(id) {
    return new Promise((resolve, reject) => {
        const user = users.find((item) => item.id === id)
        resolve(user);
    })
}

function create(user) {
    return new Promise((resolve, reject) => {
        const newUser = {id: uuidv4(), ...user}
        users.push(newUser);
        writeDataToFile('./src/data/users.json', users);
        resolve(newUser)
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        users = users.filter((item) => item.id !== id)
        writeDataToFile('./src/data/users.json', users);
        resolve()
    })
}

module.exports = {
    showUsers,
    showUser,
    create,
    remove
}