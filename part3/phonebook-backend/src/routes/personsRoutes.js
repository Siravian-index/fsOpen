import { Router } from 'express'
import * as personsController from '../controllers/personsController.js'

const personsRouter = Router()

personsRouter.get('/api/persons/:id', personsController.getPerson)
personsRouter.get('/api/persons', personsController.getPersons)
personsRouter.delete('/api/persons/:id', personsController.deletePerson)
personsRouter.post('/api/persons', personsController.createPerson)
personsRouter.put('/api/persons/:id', personsController.updatePerson)

export default personsRouter
