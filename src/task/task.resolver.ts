import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TaskService } from './task.service'
import { Task } from './models/task.modle'
import { CreateTaskInput } from './dto/createTask.input'

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  // 配列が存在しない場合、空配列を返す（nullable: 'items）
  @Query(() => [Task], { nullable: 'items' })
  getTasks(): Task[] {
    return this.taskService.getTasks()
  }

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Task {
    return this.taskService.createTask(createTaskInput)
  }
}
