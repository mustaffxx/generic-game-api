import createHttpError from "http-errors"
import { mobRepository } from "../repositories/MobRepository"

class MobService {
    async create(name: string, classification: string, experience: number) {
        if (!name || !classification || !experience)
            throw createHttpError(400, 'invalid name, classification or experience')

        const alreadyMob = await mobRepository.find({
            where: { name: name }
        })

        if (alreadyMob.length)
            throw createHttpError(409, 'mob name already exist')

        const mob = mobRepository.create({ name, classification, experience })

        await mobRepository.save(mob)

        return {
            name: mob.name,
            classification: mob.classification,
            experience: mob.experience
        }
    }

    async readByName(name: string) {
        const mob = await mobRepository.findOne({
            where: { name: name }
        })

        if (!mob)
            throw createHttpError(404, 'mob does not exist')

        return {
            name: mob.name,
            classification: mob.classification,
            experience: mob.experience
        }
    }

    async deleteByName(name: string) {
        const mob = await mobRepository.findOne({
            where: { name: name }
        })

        if (!mob)
            throw createHttpError(404, 'mob does not exist')

        await mobRepository.delete(mob.id)

        return {
            name: mob.name,
            classification: mob.classification,
            experience: mob.experience
        }
    }
}

export default new MobService()