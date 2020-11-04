const express = require("express");
const routes = express.Router();

const PetController = require("../controllers/PetController");

//POST
routes.post("/", PetController.store);

//GET
routes.get("/:id",PetController.find)
routes.get("/", PetController.index);

//PUT
routes.put("/:id", PetController.update);

//DELETE
routes.delete("/:id", PetController.delete)

module.exports = routes;