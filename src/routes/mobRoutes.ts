import { Router } from 'express'
import MobController from '../controllers/MobController'

const routes = Router()

routes.post('/api/game/mob', MobController.create)

export default routes