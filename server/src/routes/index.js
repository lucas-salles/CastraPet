const express = require('express')
const userRouter = require('./userRouter')
/*const petRouter = require("./petRouter")**/

const routes = express.Router()

routes.use('/users', userRouter)
/*routes.use("/pets", petRouter)**/

module.exports = routes