const jwt = require("jsonwebtoken");

function authenticationToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "Token de autenticação não fornecido" });

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) return res.status(401).json({ message: "Formato de token inválido" });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Token de autenticação inválido" });
    }
}

module.exports = { 
    authenticationToken 
};