import express from 'express'

require('express-async-errors')

import { errorHandler } from './middlewares/errorHandler'

import undefinedRoute from './routes/undefinedRoute'
import playerRoutes from './routes/playerRoutes'

const app = express()

app.use(express.json())

/* Routes */
app.use(playerRoutes)
app.use(undefinedRoute)

/* Default error handler */
app.use(errorHandler)

export default app