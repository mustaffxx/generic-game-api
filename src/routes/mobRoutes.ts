import { Router } from 'express'
import MobController from '../controllers/MobController'

const routes = Router()

routes.post('/api/game/mob', MobController.create)
routes.get('/api/game/mob/:name', MobController.readyByName)
routes.delete('/api/game/mob/:name', MobController.deleteByName)

export default routes