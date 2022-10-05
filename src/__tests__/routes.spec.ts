import supertest from 'supertest'
import app from '../app'
import { AppDataSource } from '../data-source'

import { playerRepository } from '../repositories/PlayerRepository'
import { mobRepository } from '../repositories/MobRepository'

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
                username: fakePlayers[0].username,
                role: fakePlayers[0].role,
                experience: 0
            })
        })

        it('should return 400 status code if pass incorrect params', async () => {
            const response = await supertest(app).post('/api/game/player').send({ username: '', role: 'role2' })

            expect(response.status).toBe(400)
        })

        it('should return 409 status code if player already exists', async () => {
            await playerRepository.create({
                username: fakePlayers[0].username,
                role: fakePlayers[0].role
            }).save()

            const response = await supertest(app).post('/api/game/player').send(fakePlayers[0])

            expect(response.status).toBe(409)
        })
    })

    describe('readyByUsername', () => {
        it('should return 200 status code with player', async () => {
            await playerRepository.create({
                username: fakePlayers[0].username,
                role: fakePlayers[0].role
            }).save()

            const response = await supertest(app).get('/api/game/player/' + fakePlayers[0].username)

            expect(response.status).toBe(200)

            expect(response.body).toEqual({
                username: fakePlayers[0].username,
                role: fakePlayers[0].role,
                experience: 0
            })
        })

        it('should return 404 status code if player does not exist', async () => {
            const response = await supertest(app).get('/api/game/player/' + fakePlayers[0].username)

            expect(response.status).toBe(404)
        })
    })

    describe('updateByUsername', () => {
        it('should return 200 status code with player renamed', async () => {
            await playerRepository.create({
                username: fakePlayers[0].username,
                role: fakePlayers[0].role
            }).save()

            const response = await supertest(app)
                .patch('/api/game/player/' + fakePlayers[0].username)
                .send({ newUsername: 'newUsername' })

            expect(response.status).toBe(200)

            expect(response.body).toEqual({
                username: 'newUsername',
                role: fakePlayers[0].role,
                experience: 0
            })
        })
    })

    it('should return 400 status code if pass incorrect params', async () => {
        const response = await supertest(app)
            .patch('/api/game/player/' + fakePlayers[0].username)
            .send({ newUsername: '' })

        expect(response.status).toBe(400)
    })

    it('should return 404 status code if player does not exist', async () => {
        const response = await supertest(app)
            .patch('/api/game/player/' + fakePlayers[0].username)
            .send({ newUsername: 'newUsername' })

        expect(response.status).toBe(404)
    })

    it('should return 409 status code if already exist a player with newUsername', async () => {
        await playerRepository.create({
            username: fakePlayers[0].username,
            role: fakePlayers[0].role
        }).save()

        await playerRepository.create({
            username: fakePlayers[1].username,
            role: fakePlayers[1].role
        }).save()

        const response = await supertest(app)
            .patch('/api/game/player/' + fakePlayers[0].username)
            .send({ newUsername: fakePlayers[1].username })

        expect(response.status).toBe(409)
    })

    describe('deleteByUsername', () => {
        it('should return 200 status code with empty values in properties', async () => {
            await playerRepository.create({
                username: fakePlayers[0].username,
                role: fakePlayers[0].role
            }).save()

            const response = await supertest(app).delete('/api/game/player/' + fakePlayers[0].username)

            expect(response.status).toBe(200)

            expect(response.body).toEqual({
                username: fakePlayers[0].username,
                role: fakePlayers[0].role,
                experience: 0
            })
        })

        it('should return 404 status code if player does not exist', async () => {
            const response = await supertest(app).delete('/api/game/player/' + fakePlayers[0].username)

            expect(response.status).toBe(404)
        })
    })

    describe('getBattle', () => {

        const fakeMobs = [
            {
                name: 'test1',
                classification: 'classification1',
                experience: 3
            }, {
                name: 'test2',
                classification: 'classification2',
                experience: 7
            },
            {
                name: 'test3',
                classification: 'classification2',
                experience: 9
            }
        ]

        it('should return 200 status code with expected response body', async () => {
            fakeMobs.forEach(async (fakeMob) => {
                await mobRepository.create({
                    name: fakeMob.name,
                    classification: fakeMob.classification,
                    experience: fakeMob.experience
                }).save()
            })

            await playerRepository.create({
                username: fakePlayers[0].username,
                role: fakePlayers[0].role
            }).save()

            const response = await supertest(app).get('/api/game/player/battle/' + fakePlayers[0].username)

            expect(response.status).toBe(200)

            expect(response.body).toEqual({
                username: expect.any(String),
                role: expect.any(String),
                experience: expect.any(Number),
                battles: expect.any(Array)
            })
        })

        it('should return 200 status code with experience equal to sum of battle experiences', async () => {
            fakeMobs.forEach(async (fakeMob) => {
                await mobRepository.create({
                    name: fakeMob.name,
                    classification: fakeMob.classification,
                    experience: fakeMob.experience
                }).save()
            })

            await playerRepository.create({
                username: fakePlayers[0].username,
                role: fakePlayers[0].role
            }).save()

            const response = await supertest(app).get('/api/game/player/battle/' + fakePlayers[0].username)

            expect(response.status).toBe(200)

            expect(response.body).toEqual({
                username: fakePlayers[0].username,
                role: fakePlayers[0].role,
                experience: response.body.battles.reduce((prev: number, battle: any) => prev + battle.experience, 0),
                battles: expect.any(Array)
            })
        })

        it('should return 404 status code if player does not exist to battle', async () => {
            const response = await supertest(app).get('/api/game/player/battle/' + fakePlayers[0].username)

            expect(response.status).toBe(404)
        })

        it('should return 404 status code if mobs does not exist to battle', async () => {
            await playerRepository.create({
                username: fakePlayers[0].username,
                role: fakePlayers[0].role
            }).save()

            const response = await supertest(app).get('/api/game/player/battle/' + fakePlayers[0].username)

            expect(response.status).toBe(404)
        })
    })
})

describe('mobRoutes', () => {

    const fakeMobs = [
        {
            name: 'test1',
            classification: 'classification1',
            experience: 2
        }, {
            name: 'test2',
            classification: 'classification2',
            experience: 5
        }
    ]

    describe('create', () => {
        it('should create mob', async () => {
            const response = await supertest(app).post('/api/game/mob').send(fakeMobs[0])

            expect(response.status).toBe(201)

            expect(response.body).toEqual({
                name: fakeMobs[0].name,
                classification: fakeMobs[0].classification,
                experience: fakeMobs[0].experience
            })
        })

        it('should return 400 status code if pass incorrect params', async () => {
            const response = await supertest(app).post('/api/game/mob').send({ name: '', classication: 'classification1' })

            expect(response.status).toBe(400)
        })

        it('should return 409 status code if mob already exists', async () => {
            await mobRepository.create({
                name: fakeMobs[0].name,
                classification: fakeMobs[0].classification,
                experience: fakeMobs[0].experience
            }).save()

            const response = await supertest(app).post('/api/game/mob').send(fakeMobs[0])

            expect(response.status).toBe(409)
        })
    })

    describe('readyByName', () => {
        it('should return 200 status code with mob', async () => {
            await mobRepository.create({
                name: fakeMobs[0].name,
                classification: fakeMobs[0].classification,
                experience: fakeMobs[0].experience
            }).save()

            const response = await supertest(app).get('/api/game/mob/' + fakeMobs[0].name)

            expect(response.status).toBe(200)

            expect(response.body).toEqual({
                name: fakeMobs[0].name,
                classification: fakeMobs[0].classification,
                experience: fakeMobs[0].experience
            })
        })

        it('should return 404 status code if mob does not exist', async () => {
            const response = await supertest(app).get('/api/game/mob/' + fakeMobs[0].name)

            expect(response.status).toBe(404)
        })
    })

    describe('deleteByName', () => {
        it('should return 200 status code with empty values in properties', async () => {
            await mobRepository.create({
                name: fakeMobs[0].name,
                classification: fakeMobs[0].classification,
                experience: fakeMobs[0].experience
            }).save()

            const response = await supertest(app).delete('/api/game/mob/' + fakeMobs[0].name)

            expect(response.status).toBe(200)

            expect(response.body).toEqual({
                name: fakeMobs[0].name,
                classification: fakeMobs[0].classification,
                experience: fakeMobs[0].experience
            })
        })

        it('should return 404 status code if mob does not exist', async () => {
            const response = await supertest(app).delete('/api/game/mob/' + fakeMobs[0].name)

            expect(response.status).toBe(404)
        })
    })
})