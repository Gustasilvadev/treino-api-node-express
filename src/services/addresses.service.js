const addressService = require("./addresses.service");

async function create(req, res, next) {
    try {
        const data = { ...req.body, idUsuario: req.user.sub };
        const address = await addressService.createAddress(data);
        res.status(201).json(address);
    } catch (error) {
        next(error);
    }
}

async function list(req, res, next) {
    try {
        const addresses = await addressService.listAddresses();
        res.json(addresses);
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    try {
        const address = await addressService.getAddressById(req.params.id);
        if (!address) return res.status(404).json({ message: "Address not found" });
        res.json(address);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const address = await addressService.updateAddress(req.params.id, req.body);
        if (!address) return res.status(404).json({ message: "Address not found" });
        res.json(address);
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        const success = await addressService.deleteAddress(req.params.id);
        if (!success) return res.status(404).json({ message: "Address not found" });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = { create, list, getById, update, remove };