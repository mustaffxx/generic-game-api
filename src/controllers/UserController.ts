import { Request, Response } from 'express'


class UserController {
    async create(req: Request, res: Response) {
        const { username, role } = req.body

        res.status(200).json({
            username,
            role
        })
    }
}

export default new UserController()