import { Router } from 'express'
import createHttpError from 'http-errors'

const routes = Router()

routes.all('*', () => {
    throw createHttpError(404, 'Page Not Found')
})

export default routes