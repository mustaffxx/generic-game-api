import createHttpError from 'http-errors'
import { userRepository } from '../repositories/UserRepository'

class UserService {
    async create(username: string, role: string) {
        if (!username || !role)
            throw createHttpError(400, 'username or role incorrect')

        const alreadyUser = await userRepository.find({
            where: { username, role }
        })

        if (alreadyUser.length)
            throw createHttpError(409, 'username already exists')

        const user = userRepository.create({ username, role })

        await userRepository.save(user)

        return user
    }
}

export default new UserService()