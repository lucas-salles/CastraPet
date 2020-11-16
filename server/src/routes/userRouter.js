const express = require("express");
const routes = express.Router();
const { autenticacao } = require("../middleware/auth");
const role = require("../middleware/role");

const UserController = require("../controllers/UserController");

// POST
routes.post("/login", autenticacao, UserController.login);
routes.post("/token-validate", UserController.tokenValidate); // ROTA PARA REVISÃO
routes.post("/", /*role.is_server,*/ UserController.store);

/**
 * Alterei de GET para POST temporariamente porque
 * método GET não aceita body na requisição.
 * Revisar com o grupo como ficará essa rota.
 */
routes.post("/cpf", /*role.is_server,*/ UserController.findByCPF);

// GET
routes.get("/:id", /*role.is_server,*/ UserController.find);
routes.get("/", /*role.is_server,*/ UserController.index);

// PUT
routes.put("/:id", /*role.is_server,*/ UserController.update);

// DELETE
routes.delete("/:id", /*role.is_server,*/ UserController.delete);

module.exports = routes;
