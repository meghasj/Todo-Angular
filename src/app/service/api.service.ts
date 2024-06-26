import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Todo } from '../models/todo.interface';
import { TodoResponse } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = `https://dummyjson.com/todos`;

  constructor(private http: HttpClient) { }

  // fetchTodos(): Observable<Todo[]> {
  //   return this.http.get<TodoResponse>(this.api)
  //   .pipe(
  //     map((response:TodoResponse) => response.todos)
  //   )
  // }
  fetchTodos(): Observable<TodoResponse> {
    return this.http.get<TodoResponse>(this.api);
  }

  // fetchTodos() {
  //   return this.http.get<Todo[]>(this.api);
  // }
}