import createHttpError from 'http-errors'
import { playerRepository } from '../repositories/PlayerRepository'

class PlayerService {
    async create(username: string, role: string) {
        if (!username || !role)
            throw createHttpError(400, 'invalid username or role')

        const alreadyPlayer = await playerRepository.find({
            where: { username: username }
        })

        if (alreadyPlayer.length)
            throw createHttpError(409, 'username already exists')

        const player = playerRepository.create({ username, role })

        await playerRepository.save(player)

        return {
            username: player.username,
            role: player.role,
            experience: player.experience
        }
    }

    async readByUsername(username: string) {
        const player = await playerRepository.findOne({
            where: { username: username }
        })

        if (!player)
            throw createHttpError(404, 'username does not exist')

        return {
            username: player.username,
            role: player.role,
            experience: player.experience
        }
    }

    async deleteByUsername(username: string) {
        const player = await playerRepository.findOne({
            where: { username: username }
        })

        if (!player)
            throw createHttpError(404, 'username does not exist')

        await playerRepository.delete(player.id)

        return {
            username: player.username,
            role: player.role,
            experience: player.experience
        }
    }
}

export default new PlayerService()