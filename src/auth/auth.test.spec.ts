import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

const MockJwtService = () => ({
  sign: jest.fn(),
})

const MockUserService = () => ({
  getUser: jest.fn(),
})

describe('AuthService', () => {
  let authService
  let userService
  let jwtService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: MockUserService() },
        { provide: JwtService, useValue: MockJwtService() },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    userService = module.get<UserService>(UserService)
    jwtService = module.get<JwtService>(JwtService)
  })

  describe('validateUser', () => {
    it('正常系', async () => {
      const expected = {
        id: 1,
        name: 'testUser1',
        email: 'test1@example.com',
        password: await bcrypt.hash('password', 10),
      }

      userService.getUser.mockResolvedValue(expected)

      const result = await authService.validateUser(
        'test1@example.com',
        'password'
      )

      expect(result).toEqual(expected)
    })

    it('異常系', async () => {
      userService.getUser.mockResolvedValue(null)
      const result = await authService.validateUser(
        'test2@example.com',
        'password'
      )

      expect(result).toBeNull()
    })
  })

  describe('signIn', () => {
    it('正常系', async () => {
      const expected = {
        id: 1,
        name: 'testUser1',
        email: 'test1@example.com',
        password: await bcrypt.hash('password', 10),
      }

      jwtService.sign.mockReturnValue(process.env.JWT_SECRET)

      const result = await authService.signIn(expected)

      expect(result).toEqual({
        accessToken: process.env.JWT_SECRET,
        user: expected,
      })
    })
  })
})
