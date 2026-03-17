const service = require("../services/addresses.service");

async function list(req, res, next) {
  try {
    const data = await service.list();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const data = await service.get(id);
    if (!data) {
      return res.status(404).json({ message: "Endereço não encontrado" });
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    // Adiciona o idUsuario pegando do token (req.user.sub)
    const payload = { ...req.body, idUsuario: req.user.sub };
    const created = await service.create(payload);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await service.update(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Endereço não encontrado" });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const ok = await service.remove(id);
    if (!ok) {
      return res.status(404).json({ message: "Endereço não encontrado" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { 
  list, 
  getById, 
  create, 
  update, 
  remove 
};