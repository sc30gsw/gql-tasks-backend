import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TaskService } from './task.service'
import { CreateTaskInput } from './dto/createTask.input'
import { Task as TaskModel } from './models/task.model'
import { Task } from '@prisma/client'

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  // 配列が存在しない場合、空配列を返す（nullable: 'items）
  @Query(() => [TaskModel], { nullable: 'items' })
  async getTasks(): Promise<Task[]> {
    return await this.taskService.getTasks()
  }

  @Mutation(() => TaskModel)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskInput)
  }
}
