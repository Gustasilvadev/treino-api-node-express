module.exports = function notFound(req, res, next) {
    res.status(404).json({ error: "Endpoint não encontrado" });
    next();
};