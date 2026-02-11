module.exports = function errorHandler(err, req, res, next) {
    console.error("Erro:", err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ 
        error: statusCode === 500 ? "Erro interno do servidor" : err.message,
        details: err.details ?? null
    });
    next();
};