import express from 'express'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

app.get('/', (request, response) => {
    response.json({ message: 'hello world' })
})

app.use(errorHandler)

app.listen(3000, () => console.log('listen on 3000'))
