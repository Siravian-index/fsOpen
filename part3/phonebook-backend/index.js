import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './src/config/db.js'
import infoRouter from './src/routes/infoRoutes.js'
import personsRouter from './src/routes/personsRoutes.js'
import { errorHandler } from './src/middleware/errors/errorHandler.js'

dotenv.config()
const app = express()
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// connect to mongoDB
connectDb()

app.use(infoRouter)
app.use(personsRouter)

// error middleware
app.use(errorHandler)
// ---------------
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`running on ${PORT}`))
