const expres = require("express");
const PetController = require("../controllers/PetController");

const routes = express.Router();

//POST
routes.post("/pets", PetController.store);

//GET
routes.get("/pets/:id",PetController.find)
routes.get("/pets/", PetController.index);

//PUT
routes.put("/pets/:di", PetController.update);

//DELETE
routes.delete("/pets/id". PetController.delete)
module.exports = routes;