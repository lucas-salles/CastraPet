const express = require("express");
const userRouter = require("./userRouter");
const petRouter = require("./petRouter");
const vaccinationRouter = require("./vaccinationRouter");
const castrationRouter = require("./castrationRouter");

const routes = express.Router();

routes.use("/users", userRouter);
routes.use("/pets", petRouter);
routes.use("/vaccinations", vaccinationRouter);
routes.use("/castrations", castrationRouter);

module.exports = routes