const express = require("express");
const routes = express.Router();
const role = require("../middleware/role");

const CastrationController = require("../controllers/CastrationController");

//POST
routes.post("/reserve", /*role.is_server,*/ CastrationController.reserve);

//PUT
routes.put("/:id", /*role.is_server,*/ CastrationController.update);

//DELETE
routes.delete("/:id", /*role.is_server,*/ CastrationController.delete);

module.exports = routes;