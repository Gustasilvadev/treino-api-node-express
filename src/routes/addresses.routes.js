const express = require('express');
const router = express.Router();
const addressController = require("../controllers/addresses.controller");
const { authenticationToken } = require("../middlewares/authenticationToken");

router.use(authenticationToken);
const authorizeRoles = require("../middlewares/authorizeRole").authorizeRoles;
/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Cria uma nova address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address criada com sucesso
 */
router.post("/",authorizeRoles("admin"), addressController.create);

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Lista todas as addresses
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de addresses retornada com sucesso
 */
router.get("/",authorizeRoles("admin","user"), addressController.list);

/**
 * @swagger
 * /addresses/{id}:
 *   get:
 *     summary: Busca uma address por ID
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da address
 *     responses:
 *       200:
 *         description: Address encontrada com sucesso
 */
router.get("/:id",authorizeRoles("admin","user"), addressController.getById);

/**
 * @swagger
 * /addresses/{id}:
 *   put:
 *     summary: Atualiza uma address existente
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Address atualizada com sucesso
 */
router.put("/:id",authorizeRoles("admin"), addressController.update);

/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Remove uma address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da address
 *     responses:
 *       200:
 *         description: Address removida com sucesso
 */
router.delete("/:id",authorizeRoles("admin"), addressController.remove);

module.exports = router;