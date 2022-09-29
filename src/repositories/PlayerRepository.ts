import { AppDataSource } from '../data-source'
import { Player } from '../entities/Player'

export const playerRepository = AppDataSource.getRepository(Player)