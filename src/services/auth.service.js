const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const repo = require("../database/repository/users.repository");

async function login(email, password) {
    const user = await repo.findByEmail(email);
    
    if (!user) return null; 

    const passwordMatch = await bcrypt.compare(password, user.senha);
    if (!passwordMatch) return null;

    let role = "user";
    if (email.includes("admin")) {
        role = "admin";
    }

    const payload = {
        sub: user.id,
        email: user.email,
        nome: user.nome,
        role: role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRES_IN 
    });

    return {
        accessToken: token,
        expiresIn: process.env.JWT_EXPIRES_IN
    };
}

module.exports = { login };