const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')

// userRouter.get('/', userController.postUser)
userRouter.post('/', userController.postUser)
// userRouter.get('/:id', userController.)
// userRouter.get('/:id', userController.)
// userRouter.get('/:id', userController.)

module.exports = { userRouter }
