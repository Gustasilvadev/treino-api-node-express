const repo = require("../database/repository/contact.repository");

function list() {
  return repo.findAll();
}

function get(id) {
  return repo.findById(id);
}

async function create(payload) {
  const novo = await repo.create(payload);
  return repo.findById(novo.id);
}

async function update(id, payload) {
  const data = { ...payload };
  
  const affected = await repo.update(id, data);
  if (!affected) return null;
  
  return repo.findById(id);
}

async function remove(id) {
  const affected = await repo.remove(id);
  return affected > 0;
}

module.exports = { 
    list, 
    get, 
    create, 
    update, 
    remove 
};