import { Router } from 'express'
import PlayerController from '../controllers/PlayerController'

const routes = Router()

routes.post('/api/game/player', PlayerController.create)
routes.get('/api/game/player/:username', PlayerController.readyByUsername)

export default routes