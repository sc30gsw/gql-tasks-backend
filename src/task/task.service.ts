import { Injectable } from '@nestjs/common'
import { Task } from './models/task.modle'

@Injectable()
export class TaskService {
  tasks: Task[] = []

  getTasks(): Task[] {
    return this.tasks
  }

  createTask(name: string, dueDate: string, description?: string): Task {
    const newTask = new Task()
    newTask.id = this.tasks.length + 1
    newTask.name = name
    newTask.dueDate = dueDate
    newTask.description = description
    newTask.status = 'NOT_STARTED'

    this.tasks.push(newTask)

    return newTask
  }
}
