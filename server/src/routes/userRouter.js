const express = require('express')
const routes = express.Router()

const UserController = require('../controllers/UserController')

// POST
routes.post('/:id', UserController.update)
routes.post('/', UserController.store)

// GET
routes.get('/:id', UserController.find)
routes.get('/', UserController.index)

// PUT
routes.put('/:id', UserController.delete)

module.exports = routes;