const testRouter = require('express').Router()
const testController = require('../controllers/testController')

testRouter.post('/reset', testController.clearDb)

module.exports = { testRouter }
