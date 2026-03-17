const express = require("express");
const router = express.Router();
const usersController = require('../controllers/users.controller');

const { authenticationToken } = require("../middlewares/authenticationToken");
const authorizeRoles = require("../middlewares/authorizeRole").authorizeRoles;

// --- ROTAS PÚBLICAS
// GET /api/v1/users

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    summary: Lista todos os usuários
 *    tags: [Usuários]
 *    responses:
 *      200:
 *        description: Lista de usuários retornada com sucesso
 */
router.get("/", usersController.list);

// GET /api/v1/users/:id
/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *    summary: Busca um usuário por ID
 *    tags: [Usuários]
 *    parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: ID do usuário
 *    responses:
 *      200:
 *        description: Usuário encontrado
 *      404:
 *        description: Usuário não encontrado
 */
router.get("/:id", usersController.getById);


// --- ROTAS PROTEGIDAS
// POST /api/v1/users

// router.post("/", 
//   authenticationToken, 
//   authorizeRoles("user", "admin"), 
//   usersController.create
// );

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *    summary: Cadastra um novo usuário
 *    tags: [Usuários]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nome:
 *                type: string
 *              email:
 *                type: string
 *    responses:
 *      201:
 *         description: Usuário criado com sucesso
 */
router.post("/", usersController.create);

// PUT /api/v1/users/:id
/**
 * @swagger
 * /api/v1/users/{id}:
 *  put:
 *    summary: Atualiza um usuário existente
 *    tags: [Usuários]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: ID do usuário
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nome:
 *                type: string
 *              email:
 *                type: string
 *    responses:
 *      200:
 *        description: Usuário atualizado com sucesso
 *      401:
 *        description: Não autorizado (Token de autenticação ausente ou inválido)
 *      403:
 *        description: Proibido (Usuário não possui a permissão/role necessária)
 *      404:
 *        description: Usuário não encontrado
 */
router.put("/:id", 
  authenticationToken, 
  authorizeRoles("user", "admin"), 
  usersController.update
);

// DELETE /api/v1/users/:id
/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Usuários]
 *         security:
 *          - bearerAuth: []
 *            parameters:
 *             - in: path
 *               name: id
 *               required: true
 *               schema:
 *                type: integer
 *                description: ID do usuário
 *               responses:
 *                200:
 *                 description: Usuário removido com sucesso
 *                401:
 *                 description: Não autorizado (Token de autenticação ausente ou inválido)
 *                403:
 *                 description: Proibido (Usuário não possui a permissão/role necessária)
 *                404:
 *                 description: Usuário não encontrado
 */
router.delete("/:id", 
  authenticationToken, 
  authorizeRoles("admin"), 
  usersController.remove
);

module.exports = router;