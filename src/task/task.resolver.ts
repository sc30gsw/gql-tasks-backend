import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TaskService } from './task.service'
import { CreateTaskInput } from './dto/createTask.input'
import { Task as TaskModel } from './models/task.model'
import { Task } from '@prisma/client'
import { UpdateTaskInput } from './dto/updateTask.input'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  // 配列が存在しない場合、空配列を返す（nullable: 'items）
  @Query(() => [TaskModel], { nullable: 'items' })
  // トークンが含まれている場合のみリクエストを受け付ける
  @UseGuards(JwtAuthGuard)
  async getTasks(
    @Args('userId', { type: () => Int }) userId: number
  ): Promise<Task[]> {
    return await this.taskService.getTasks(userId)
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskInput)
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput
  ): Promise<Task> {
    return await this.taskService.updateTask(updateTaskInput)
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return await this.taskService.deleteTask(id)
  }
}
