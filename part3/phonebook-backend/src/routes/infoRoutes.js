import { Router } from 'express'
import * as infoController from '../controllers/infoController.js'

const infoRouter = Router()

infoRouter.get('/info', infoController.getInfo)

export default infoRouter
