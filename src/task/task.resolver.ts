import { Query, Resolver } from '@nestjs/graphql'
import { TaskService } from './task.service'
import { Task } from './models/task.modle'

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  // 配列が存在しない場合、空配列を返す（nullable: 'items）
  @Query(() => [Task], { nullable: 'items' })
  getTasks(): Task[] {
    return this.taskService.getTasks()
  }
}