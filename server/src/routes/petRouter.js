const express = require("express");
const routes = express.Router();
const role = require("../middleware/role");

const PetController = require("../controllers/PetController");

//POST
routes.post("/", /*role.is_user,*/ PetController.store);

//GET
routes.get("/search", /*role.is_user,*/ PetController.findByProperties);
// routes.get("/vaccinated", /*role.is_user,*/ PetController.findVaccinated);
routes.get("/:id/vaccinations", /*role.is_user,*/ PetController.findWithVaccinations);
routes.get("/:id", /*role.is_user,*/ PetController.find);
routes.get("/", /*role.is_server,*/ PetController.index);

//PUT
routes.put("/:id", /*role.is_user,*/ PetController.update);

//DELETE
routes.delete("/:id", /*role.is_server,*/ PetController.delete);

module.exports = routes;