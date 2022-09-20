import { AppDataSource } from '../data-source'
import { User } from '../entities/User'

class UserService {
    async create(username: string, role: string) {
        const userRepository = AppDataSource.getRepository(User)

        const user = userRepository.create({ username, role })

        await userRepository.save(user)

        return user
    }
}

export default new UserService()