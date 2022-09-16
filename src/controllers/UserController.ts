import { Request, Response } from 'express'

import UserService from '../services/UserService'

class UserController {
    async create(req: Request, res: Response) {
        const { username, role } = req.body

        const user = await UserService.create(username, role)

        return res.status(201).json(user)
    }
}

export default new UserController()