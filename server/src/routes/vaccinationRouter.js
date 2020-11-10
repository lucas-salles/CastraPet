const express = require("express");
const routes = express.Router();

const VaccinationController = require("../controllers/VaccinationController");

//POST
routes.post("/", VaccinationController.store);

//GET
routes.get("/:id", VaccinationController.find);
routes.get("/", VaccinationController.index);

//PUT
routes.put("/:id", VaccinationController.update);

//DELETE
routes.delete("/:id", VaccinationController.delete);

module.exports = routes;