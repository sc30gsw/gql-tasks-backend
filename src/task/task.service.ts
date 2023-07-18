import { Injectable } from '@nestjs/common'
import { Task } from './models/task.modle'
import { CreateTaskInput } from './dto/createTask.input'

@Injectable()
export class TaskService {
  tasks: Task[] = []

  getTasks(): Task[] {
    return this.tasks
  }

  createTask(createTaskInput: CreateTaskInput): Task {
    const { name, dueDate, description } = createTaskInput

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
