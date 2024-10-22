import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);

  getTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  addTodo(text: string) {
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', {
      title: text,
    });
  }

  deleteTodo(id: number) {
    return this.http.delete<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );
  }
}
