const { Contato } = require("../database/models"); // Mantemos o nome do model como está no banco

async function createContact(data) {
    return await Contato.create(data);
}

async function listContacts(userId) {
    const whereClause = userId ? { idUsuario: userId } : {};
    return await Contato.findAll({ where: whereClause });
}

async function getContactById(id) {
    return await Contato.findByPk(id);
}

async function updateContact(id, data) {
    const contact = await Contato.findByPk(id);
    if (!contact) return null;
    return await contact.update(data);
}

async function deleteContact(id) {
    const contact = await Contato.findByPk(id);
    if (!contact) return false;
    await contact.destroy();
    return true;
}

module.exports = { createContact, listContacts, getContactById, updateContact, deleteContact };