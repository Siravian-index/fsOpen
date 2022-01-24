const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')
// middleware
const userMiddleware = require('../utils/middleware/userMiddleware')
userRouter.get('/', userController.getUsers)
userRouter.post('/', userMiddleware.verifyNewUserData, userController.postUser)
// userRouter.get('/:id', userController.)
// userRouter.get('/:id', userController.)
// userRouter.get('/:id', userController.)

module.exports = { userRouter }
