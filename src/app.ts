import express from 'express'

require('express-async-errors')

import YAML from 'yamljs'
import swaggerUI from 'swagger-ui-express'

import { errorHandler } from './middlewares/errorHandler'

import undefinedRoute from './routes/undefinedRoute'
import playerRoutes from './routes/playerRoutes'
import mobRoutes from './routes/mobRoutes'

const app = express()

app.use(express.json())

const swaggerJsDocs = YAML.load('./src/docs.yaml')
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))

/* Routes */
app.use(playerRoutes)
app.use(mobRoutes)
app.use(undefinedRoute)

/* Default error handler */
app.use(errorHandler)

export default app