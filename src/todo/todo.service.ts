import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { UpdateTodoInput, CreateTodoInput } from './dto/inputs';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del alma', done: false },
    { id: 2, description: 'Piedra del tiempo', done: true },
    { id: 3, description: 'Piedra de la realidad', done: false },
    { id: 4, description: 'Piedra del poder', done: false },
  ];

  findAll(): Todo[] {
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
    if (!todo)
      throw new NotFoundException(`Todo: ${updateTodoInput.id} is not found`);
    const index = this.todos.indexOf(todo);
    const todoUpdated = (this.todos[index] = {
      ...todo,
      ...updateTodoInput,
    });
    return todoUpdated;
  }

  deleteTodo(id: number) {
    const todo = this.findOne(id);
    if (!todo) throw new NotFoundException(`Todo: ${id} not found`);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return `Todo ${id} deleted successfully`;
  }
}
