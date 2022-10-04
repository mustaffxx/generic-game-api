import { Request, Response } from 'express'

import MobService from '../services/MobService'

class MobController {
    async create(req: Request, res: Response) {
        const { name, classification } = req.body

        const mob = await MobService.create(name, classification)

        return res.status(201).json(mob)
    }
}

export default new MobController()