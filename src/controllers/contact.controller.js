const contactService = require("../services/contact.service");

async function create(req, res, next) {
    try {
        const data = { ...req.body, idUsuario: req.user.sub };
        const contact = await contactService.createContact(data);
        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
}

async function list(req, res, next) {
    try {
        const contacts = await contactService.listContacts();
        res.json(contacts);
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    try {
        const contact = await contactService.getContactById(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const contact = await contactService.updateContact(req.params.id, req.body);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        const success = await contactService.deleteContact(req.params.id);
        if (!success) return res.status(404).json({ message: "Contact not found" });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = { create, list, getById, update, remove };