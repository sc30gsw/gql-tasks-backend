import { Test } from '@nestjs/testing'
import { UserService } from './user.service'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'

const MockPrismaService = () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
})

describe('taskServiceTest', () => {
  let userService
  let prismaService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: MockPrismaService() },
      ],
    }).compile()

    userService = module.get<UserService>(UserService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  describe('createUser', () => {
    it('正常系', async () => {
      const expected = {
        id: 1,
        name: 'testUser1',
        email: 'test1@example.com',
        password: await bcrypt.hash('password', 10),
      }

      prismaService.user.create.mockResolvedValue(expected)
      const result = await userService.createUser({
        name: 'testUser1',
        email: 'test1@example.com',
        password: 'password',
      })

      expect(result.name).toEqual(expected.name)
      expect(result.email).toEqual(expected.email)
      expect(await bcrypt.compare('password', result.password)).toBe(true)
    })

    it('異常系: 存在済みのメールアドレスで登録', async () => {
      const expected = {
        id: 1,
        name: 'testUser1',
        email: 'test1@example.com',
        password: await bcrypt.hash('password', 10),
      }

      prismaService.user.findUnique.mockResolvedValue(expected)

      await expect(
        userService.createUser({
          name: 'testUser1',
          email: 'test1@example.com',
          password: 'password',
        })
      ).rejects.toThrow('メールアドレスは登録済みです')
    })
  })

  describe('getUser', () => {
    it('正常系', async () => {
      const expected = {
        id: 1,
        name: 'testUser1',
        email: 'test1@example.com',
      }

      prismaService.user.findUnique.mockResolvedValue(expected)

      const result = await userService.getUser('test1@example.com')

      expect(result).toEqual(expected)
    })
  })
})
