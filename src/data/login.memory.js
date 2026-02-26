const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const repo = require("./users.memory");

const logins = [
    {
        id: 1,
        username: "admin",
        password: bcrypt.hashSync("123", 10),
    },
    {
        id: 2,
        username: "user",
        password: bcrypt.hashSync("123", 10),
    }

];

function findByUsername(username) {
    return logins.find(l => l.username === username) || null;
}

function createLogin(username, password) {
    const nextId = logins.length ? Math.max(...logins.map(l => l.id)) + 1 : 1;
    const newLogin = {
        id: nextId,
        username,
        password: bcrypt.hashSync(password, 10)
    };
    logins.push(newLogin);
    return newLogin;
}