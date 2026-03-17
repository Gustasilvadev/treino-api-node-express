const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const repo = require("../database/repository/users.repository");

async function login(email, password) {
    const user = await repo.findByEmail(email);
    
    // Se o usuário não existir, retorna nulo logo de cara
    if (!user) return null; 

    // 1. Prevenção de Erro 500: Converte a senha recebida e a senha do banco para String.
    // Isso evita o crash caso o Postman/Swagger envie a senha como Number.
    const senhaDigitada = String(password);
    const hashNoBanco = String(user.senha);

    // 2. Compara a senha digitada com o hash
    const passwordMatch = await bcrypt.compare(senhaDigitada, hashNoBanco);
    
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