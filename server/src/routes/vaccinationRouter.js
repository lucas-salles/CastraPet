const express = require("express");
const routes = express.Router();
const role = require("../middleware/role");

const VaccinationController = require("../controllers/VaccinationController");

//POST
routes.post("/", /*role.is_server,*/ VaccinationController.store);

//GET
routes.get("/:id", /*role.is_server,*/ VaccinationController.find);
routes.get("/", /*role.is_server,*/ VaccinationController.index);

//PUT
routes.put("/:id", /*role.is_server,*/ VaccinationController.update);

//DELETE
routes.delete("/:id", /*role.is_server,*/ VaccinationController.delete);

module.exports = routes;