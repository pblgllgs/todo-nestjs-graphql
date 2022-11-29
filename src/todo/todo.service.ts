import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { UpdateTodoInput, CreateTodoInput, StatusArgs } from './dto';
@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del alma', done: false },
    { id: 2, description: 'Piedra del tiempo', done: true },
    { id: 3, description: 'Piedra de la realidad', done: true },
    { id: 4, description: 'Piedra del poder', done: false },
    { id: 5, description: 'Piedra de la mente', done: false },
  ];

  getTotalTodos() {
    return this.todos.length;
  }

  getCompletedTodos() {
    const completedTodos = this.todos.filter((todo) => todo.done === true);
    return completedTodos.length;
  }

  getPendingTodos() {
    const pendingTodos = this.todos.filter((todo) => todo.done === false);
    return pendingTodos.length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;
    if (status !== undefined)
      return this.todos.filter((todo) => todo.done === status);
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`This id dont exist: ${id}`);
    return todo;
  }

  createTodo(createTodoInput: CreateTodoInput): Todo {
    const newTodo = {
      id: this.todos.length + 1,
      description: createTodoInput.description,
      done: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(updateTodoInput: UpdateTodoInput) {
    const todo = this.findOne(updateTodoInput.id);
    const index = this.todos.indexOf(todo);
    const todoUpdated = (this.todos[index] = {
      ...todo,
      ...updateTodoInput,
    });
    return todoUpdated;
  }

  deleteTodo(id: number): boolean {
    this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return true;
  }
}
