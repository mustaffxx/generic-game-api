import { Router } from 'express'
import UserController from '../controllers/UserController'

const routes = Router()

routes.post('/api/game/user', UserController.create)
routes.get('/api/game/user/:username', UserController.readyByUsername)

export default routes