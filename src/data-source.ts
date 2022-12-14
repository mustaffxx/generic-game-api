import 'dotenv/config'
import 'reflect-metadata'

import { DataSource } from 'typeorm'

import { Player } from './entities/Player'
import { Mob } from './entities/Mob'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT as string) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    entities: [Player, Mob],
    synchronize: true,
    dropSchema: true
})