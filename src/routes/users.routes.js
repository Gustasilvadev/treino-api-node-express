const express = require("express");
repo = require("../data/users.memory");
const router = express.Router();

// Listar todos os usuários
router.get("/", (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    
    const all = repo.getAll();
    const start = (page - 1) * limit;
    const items = all.slice(start, start + limit);
    res.status(200).json({
        page,
        limit,
        total: all.length,
        items
    });
});

// Obter um usuário por ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = repo.getById(id);
    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
});

