const contact = require("../models"); 

function findAll() {
  return contact.Contato.findAll();
}

function findById(id) {
  return contact.Contato.findByPk(id);
}

function create(data) {
  return contact.Contato.create(data);
}

async function update(id, data) {
  const [affected] = await contact.Contato.update(data, { where: { id } });
  return affected;
}

function remove(id) {
  return contact.Contato.destroy({ where: { id } });
}

module.exports = { 
    findAll, 
    findById, 
    create, 
    update, 
    remove 
};