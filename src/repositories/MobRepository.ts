import { AppDataSource } from '../data-source'
import { Mob } from '../entities/Mob'

export const mobRepository = AppDataSource.getRepository(Mob)