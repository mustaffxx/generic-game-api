import supertest from 'supertest'
import app from '../app'
import { AppDataSource } from '../data-source'

beforeAll(async () => {
    await AppDataSource.initialize()
})

beforeEach(async () => {
    await AppDataSource.synchronize(true)
})

afterAll(async () => {
    await AppDataSource.destroy()
})

describe('playerRoutes', () => {

    const fakePlayers = [
        {
            username: 'test1',
            role: 'role1'
        }, {
            username: 'test2',
            role: 'role2'
        }
    ]

    describe('create', () => {
        it('should create player', async () => {
            const response = await supertest(app).post('/api/game/player').send(fakePlayers[0])

            expect(response.status).toBe(201)

            expect(response.body).toEqual({
                username: expect.any(String),
                role: expect.any(String),
                experience: expect.any(String)
            })
        })

        it('should return 400 status code if pass incorrect params', async () => {
            const response = await supertest(app).post('/api/game/player').send({ username: '', role: 'role2' })

            expect(response.status).toBe(400)
        })

        it('should return 409 status code if player already exists', async () => {
            await supertest(app).post('/api/game/player').send(fakePlayers[0])

            const response = await supertest(app).post('/api/game/player').send(fakePlayers[0])

            expect(response.status).toBe(409)
        })
    })

    describe('readyByUsername', () => {
        it('should return 200 status code with player', async () => {
            await supertest(app).post('/api/game/player').send(fakePlayers[0])

            const response = await supertest(app).get('/api/game/player/' + fakePlayers[0].username)

            expect(response.status).toBe(200)

            expect(response.body).toEqual({
                username: expect.any(String),
                role: expect.any(String),
                experience: expect.any(String)
            })
        })

        it('should return 204 status code if player does not exist', async () => {
            const response = await supertest(app).get('/api/game/player/' + fakePlayers[0].username)

            expect(response.status).toBe(204)
        })
    })
})