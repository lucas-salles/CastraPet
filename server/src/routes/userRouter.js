const express = require("express");
const routes = express.Router();

const UserController = require("../controllers/UserController");

// POST
routes.post("/", UserController.store);

// GET
routes.get("/:id", UserController.find);
routes.get("/", UserController.index);

// PUT
routes.put("/:id", UserController.update);

// DELETE
routes.delete("/:id", UserController.delete);

module.exports = routes;
