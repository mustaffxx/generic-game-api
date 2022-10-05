import createHttpError from 'http-errors'
import { playerRepository } from '../repositories/PlayerRepository'
import { mobRepository } from '../repositories/MobRepository'

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

    async updateByUsername(username: string, newUsername: string) {
        if (!newUsername)
            throw createHttpError(400, 'invalid new username')

        const player = await playerRepository.findOne({
            where: { username: username }
        })

        if (!player)
            throw createHttpError(404, 'player does not exist')

        const playerWithNewUsername = await playerRepository.findOne({
            where: { username: newUsername }
        })

        if (playerWithNewUsername)
            throw createHttpError(409, 'new username already used')

        player.username = newUsername

        await playerRepository.save(player)

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

    async getBattle(username: string) {
        const player = await playerRepository.findOne({
            where: { username: username }
        })

        if (!player)
            throw createHttpError(404, 'player does not exist')

        const [allMobs, mobsCount] = await mobRepository.findAndCount()

        if (!mobsCount)
            throw createHttpError(404, 'mob does not exist')


        const battles = []

        const randomNumberOfBattles = Math.floor(Math.random() * 11)

        for (let i = 0; i < randomNumberOfBattles; i++) {
            const randomMobIndex = Math.floor(Math.random() * mobsCount)

            const mob = allMobs[randomMobIndex]

            player.experience += mob.experience

            battles.push({
                name: mob.name,
                classification: mob.classification,
                experience: mob.experience
            })
        }

        await playerRepository.save(player)

        return {
            username: player.username,
            role: player.role,
            experience: player.experience,
            battles: battles
        }

    }
}

export default new PlayerService()