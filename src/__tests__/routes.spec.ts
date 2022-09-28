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
    AppDataSource.destroy()
})

describe('userRoute', () => {
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
        const response = await supertest(app).post('/api/game/user').send(testUsers[0]).set('Accept', 'application/json')

        expect(response.status).toBe(201)
    })
})