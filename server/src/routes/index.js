const express = require("express");
const userRouter = require("./userRouter");
const petRouter = require("./petRouter");
const vaccinationRouter = require("./vaccinationRouter");

const routes = express.Router();

routes.use("/users", userRouter);
routes.use("/pets", petRouter);
routes.use("/vaccinations", vaccinationRouter);

module.exports = routes