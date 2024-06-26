import { Todo } from "./todo.interface";

export interface TodoResponse {
    todos: Todo[];
    total: number;
    skip: number;
    limit: number;
  }