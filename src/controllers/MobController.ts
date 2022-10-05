import { Request, Response } from 'express'

import MobService from '../services/MobService'

class MobController {
    async create(req: Request, res: Response) {
        const { name, classification, experience } = req.body

        const mob = await MobService.create(name, classification, experience)

        return res.status(201).json(mob)
    }

    async readyByName(req: Request, res: Response) {
        const name = req.params.name

        const mob = await MobService.readByName(name)

        return res.status(200).json(mob)
    }

    async updateByName(req: Request, res: Response) {
        const name = req.params.name

        const { newName } = req.body

        const mob = await MobService.updateByName(name, newName)

        return res.status(200).json(mob)
    }

    async deleteByName(req: Request, res: Response) {
        const name = req.params.name

        const mob = await MobService.deleteByName(name)

        return res.status(200).json(mob)
    }
}

export default new MobController()