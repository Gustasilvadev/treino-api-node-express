const express = require("express");
const repo = require("../data/users.memory");
const router = express.Router();

router.get("/", (req, res) => res.json(repo.getAll()));

router.get("/:id", (req, res) => {
    const user = repo.getById(req.params.id);
    user ? res.json(user) : res.status(404).json({ error: "Não encontrado" });
});

router.post("/", (req, res) => res.status(201).json(repo.createUser(req.body.name)));

router.put("/:id", (req, res) => {
    const user = repo.update(req.params.id, req.body.name);
    user ? res.json(user) : res.status(404).json({ error: "Não encontrado" });
});

router.delete("/:id", (req, res) => {
    repo.deleteById(req.params.id) ? res.status(204).send() : res.status(404).json({ error: "Não encontrado" });
});

module.exports = router;