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

describe('userRoute', () => {
    describe('create', () => {
        const testUsers = [
            {
                username: 'test1',
                role: 'role1'
            }, {
                username: 'test2',
                role: 'role2'
            }
        ]

        it('should create user', async () => {
            const response = await supertest(app).post('/api/game/user').send(testUsers[0])

            expect(response.status).toBe(201)

            expect(response.body).toEqual({
                username: expect.any(String),
                role: expect.any(String),
                experience: expect.any(String)
            })
        })

        it('should return 400 status code if pass incorrect params', async () => {
            const response = await supertest(app).post('/api/game/user').send({ username: '', role: 'role2' })

            expect(response.status).toBe(400)
        })

        it('should return 409 status code if user already exists', async () => {
            await supertest(app).post('/api/game/user').send(testUsers[0])

            const response = await supertest(app).post('/api/game/user').send(testUsers[0])

            expect(response.status).toBe(409)
        })
    })
})