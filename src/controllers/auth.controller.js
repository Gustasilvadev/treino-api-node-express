const authService = require("../services/auth.service");

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email e senha obrigatórios" });
        }
        const result = await authService.login(email, password);
        if (!result) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = { login };