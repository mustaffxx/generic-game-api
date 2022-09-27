import createHttpError from 'http-errors'
import { AppDataSource } from '../data-source'
import { User } from '../entities/User'

class UserService {
    async create(username: string, role: string) {
        if (!username || !role)
            throw createHttpError(400, 'username or role incorrect')

        const userRepository = AppDataSource.getRepository(User)

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