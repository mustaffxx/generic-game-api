import createHttpError from 'http-errors'
import { userRepository } from '../repositories/UserRepository'

class UserService {
    async create(username: string, role: string) {
        if (!username || !role)
            throw createHttpError(400, 'username or role invalid')

        const alreadyUser = await userRepository.find({
            where: { username: username }
        })

        if (alreadyUser.length)
            throw createHttpError(409, 'username already exists')

        const user = userRepository.create({ username, role })

        await userRepository.save(user)

        return {
            username: user.username,
            role: user.role,
            experience: user.experience
        }
    }

    async readByUsername(username: string) {
        if (!username)
            throw createHttpError(400, 'username invalid')

        const user = await userRepository.findOne({
            where: { username: username }
        })

        if (!user)
            throw createHttpError(204, 'username does not exist')

        return {
            username: user.username,
            role: user.role,
            experience: user.experience
        }
    }
}

export default new UserService()