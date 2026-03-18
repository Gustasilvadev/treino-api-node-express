function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        console.log("Roles permitidas:", allowedRoles);
        console.log("Dados do usuário no request:", req.user);
        if(!req.user || !req.user.role) {
            return res.status(401).json({message:"Usuário não autenticado"})
        }

        if (!allowedRoles.map(r => r.toLowerCase()).includes(req.user.role.toLowerCase())) {
            return res.status(403).json({ message: "Acesso negado" });
        }

        return next();
    };
}

module.exports = {
    authorizeRoles
};