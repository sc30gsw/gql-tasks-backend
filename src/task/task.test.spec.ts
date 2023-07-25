import { Test } from '@nestjs/testing'
import { TaskService } from './task.service'
import { PrismaService } from '../prisma/prisma.service'
import { Status } from '@prisma/client'

const MockPrismaService = () => ({
  task: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
})

const mockUser1 = {
  id: 1,
  username: 'test1',
  email: 'test1@example.com',
  password: 'password',
}

describe('taskServiceTest', () => {
  let taskService
  let prismaService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: PrismaService, useValue: MockPrismaService() },
      ],
    }).compile()

    taskService = module.get<TaskService>(TaskService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  describe('getTasks', () => {
    it('正常系', async () => {
      const expected = []
      prismaService.task.findMany.mockResolvedValue(expected)
      const result = await taskService.getTasks(mockUser1.id)

      expect(result).toEqual(expected)
    })
  })

  describe('createTask', () => {
    it('正常系', async () => {
      const expected = {
        id: 1,
        name: 'task1',
        dueDate: '2023-07-22T05:25:33.000Z',
        status: Status.NOT_STARTED,
        description: 'create task',
        userId: mockUser1.id,
        user: mockUser1,
      }

      prismaService.task.create.mockResolvedValue(expected)
      const result = await taskService.createTask({
        name: 'task1',
        dueDate: '2023-07-22T05:25:33.000Z',
        description: 'create task',
        userId: mockUser1.id,
      })

      expect(result).toEqual(expected)
    })
  })

  describe('updateTask', () => {
    const mockTask = {
      id: 1,
      name: 'task1',
      dueDate: '2023-07-22T05:25:33.000Z',
      status: Status.NOT_STARTED,
      description: 'create task',
      userId: mockUser1.id,
      user: mockUser1,
    }

    it('正常系', async () => {
      const expectedUpdatedTask = {
        ...mockTask,
        name: 'updatedTask1',
        dueDate: new Date(),
        status: Status.IN_PROGRESS,
        description: 'update task',
      }

      prismaService.task.update.mockResolvedValue(expectedUpdatedTask)

      const updateTaskInput = {
        id: 1,
        name: 'updatedTask1',
        dueDate: expectedUpdatedTask.dueDate,
        status: Status.IN_PROGRESS,
        description: 'update task',
      }

      await taskService.updateTask(updateTaskInput)

      expect(prismaService.task.update).toHaveBeenCalledWith({
        data: {
          name: updateTaskInput.name,
          dueDate: updateTaskInput.dueDate,
          status: updateTaskInput.status,
          description: updateTaskInput.description,
        },
        where: { id: updateTaskInput.id },
      })
    })
  })

  describe('deleteTask', () => {
    const mockTask = {
      id: 1,
      name: 'task1',
      dueDate: '2023-07-22T05:25:33.000Z',
      status: Status.IN_PROGRESS,
      description: 'create task',
      userId: mockUser1.id,
      user: mockUser1,
    }
    it('正常系', async () => {
      prismaService.task.delete.mockResolvedValue(mockTask)
      await taskService.deleteTask(1)
      expect(prismaService.task.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      })
    })
  })
})
