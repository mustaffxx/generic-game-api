import express from 'express'

require('express-async-errors')

import { errorHandler } from './middlewares/errorHandler'

import undefinedRoute from './routes/undefinedRoute'
import userRoute from './routes/userRoute'

const app = express()

app.use(express.json())

/* Routes */
app.use(userRoute)
app.use(undefinedRoute)

/* Default error handler */
app.use(errorHandler)

export default app