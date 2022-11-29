import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateTodoInput,
  UpdateTodoInput,
  StatusArgs,
  AggregationsTypes,
} from './dto';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.createTodo(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.updateTodo(updateTodoInput);
  }

  @Mutation(() => Boolean, { name: 'deleteTodo' })
  deleteTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Query(() => Int, { name: 'totalTodos' })
  totalTodos() {
    return this.todoService.getTotalTodos();
  }

  @Query(() => Int, { name: 'completedTodos' })
  completedTodos() {
    return this.todoService.getCompletedTodos();
  }

  @Query(() => Int, { name: 'pendingTodos' })
  pendingTodos() {
    return this.todoService.getPendingTodos();
  }

  @Query(() => AggregationsTypes)
  aggregations(): AggregationsTypes {
    return {
      completed: this.todoService.getCompletedTodos(),
      pending: this.todoService.getPendingTodos(),
      total: this.todoService.getTotalTodos(),
      totalTodosCompleted: this.todoService.getTotalTodos(),
    };
  }
}
