import { Injectable } from '@nestjs/common'
import { CreateTaskInput } from './dto/createTask.input'
import { Task } from '@prisma/client'
import { UpdateTaskInput } from './dto/updateTask.input'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks(userId: number): Promise<Task[]> {
    return await this.prismaService.task.findMany({ where: { userId } })
  }

  async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
    const { name, dueDate, description, userId } = createTaskInput

    return await this.prismaService.task.create({
      data: {
        name,
        dueDate,
        description,
        userId,
      },
    })
  }

  async updateTask(updateTaskInput: UpdateTaskInput): Promise<Task> {
    const { id, name, dueDate, description, status } = updateTaskInput

    return await this.prismaService.task.update({
      data: {
        name,
        dueDate,
        status,
        description,
      },
      where: { id },
    })
  }

  async deleteTask(id: number): Promise<Task> {
    return await this.prismaService.task.delete({ where: { id } })
  }
}
