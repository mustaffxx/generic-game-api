import createHttpError from "http-errors"
import { mobRepository } from "../repositories/MobRepository"

class MobService {
    async create(name: string, classification: string) {
        if (!name || !classification)
            throw createHttpError(400, 'invalid name or classification')

        const alreadyMob = await mobRepository.find({
            where: { name: name }
        })

        if (alreadyMob.length)
            throw createHttpError(409, 'mob name already exist')

        const mob = mobRepository.create({ name, classification })

        await mobRepository.save(mob)

        return {
            name: mob.name,
            classification: mob.classification,
            experience: mob.experience
        }
    }
}

export default new MobService()