import { Router } from 'express'
import PlayerController from '../controllers/PlayerController'

const routes = Router()

routes.post('/api/game/player', PlayerController.create)
routes.get('/api/game/player/:username', PlayerController.readyByUsername)
routes.patch('/api/game/player/:username', PlayerController.updateByUsername)
routes.delete('/api/game/player/:username', PlayerController.deleteByUsername)
routes.get('/api/game/player/battle/:username', PlayerController.getBattle)

export default routes