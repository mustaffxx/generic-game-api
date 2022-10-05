import { Request, Response } from 'express'

import PlayerService from '../services/PlayerService'

class PlayerController {
    async create(req: Request, res: Response) {
        const { username, role } = req.body

        const player = await PlayerService.create(username, role)

        return res.status(201).json(player)
    }

    async readyByUsername(req: Request, res: Response) {
        const username = req.params.username

        const player = await PlayerService.readByUsername(username)

        return res.status(200).json(player)
    }

    async deleteByUsername(req: Request, res: Response) {
        const username = req.params.username

        const player = await PlayerService.deleteByUsername(username)

        return res.status(200).json(player)
    }

    async updateByUsername(req: Request, res: Response) {
        const username = req.params.username

        const { newUsername } = req.body

        const player = await PlayerService.updateByUsername(username, newUsername)

        return res.status(200).json(player)
    }

    async getBattle(req: Request, res: Response) {
        const username = req.params.username

        const player = await PlayerService.getBattle(username)

        return res.status(200).json(player)
    }
}

export default new PlayerController()