const express = require("express");
const router = express.Router();
const usersController = require('../controllers/users.controller');

const { authenticationToken } = require("../middlewares/authenticationToken");
const authorizeRoles = require("../middlewares/authorizeRole").authorizeRoles;

// --- ROTAS PÚBLICAS
// GET /api/v1/users
router.get("/", usersController.list);

// GET /api/v1/users/:id
router.get("/:id", usersController.getById);


// --- ROTAS PROTEGIDAS
// POST /api/v1/users

// router.post("/", 
//   authenticationToken, 
//   authorizeRoles("user", "admin"), 
//   usersController.create
// );

router.post("/", usersController.create);

// PUT /api/v1/users/:id
router.put("/:id", 
  authenticationToken, 
  authorizeRoles("user", "admin"), 
  usersController.update
);

// DELETE /api/v1/users/:id
router.delete("/:id", 
  authenticationToken, 
  authorizeRoles("admin"), 
  usersController.remove
);

module.exports = router;