import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TodoActions } from './store/actions';
import { todosFeature } from './store/todos.feature';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input [(ngModel)]="newTodoText" placeholder="New Todo" />
    <button (click)="addTodo()">Add</button>
    @if (todosState().loading) {
    <span>Loading...</span>
    } @else if (todosState().error) {
    <span>Error: {{ todosState().error }}</span>
    } @else {
    <ul>
      @for (todo of todosState().todos; track todo.id) {
      <li>
        {{ todo.title }}
        <button (click)="deleteTodo(todo.id)" class="delete-todo">X</button>
      </li>
      }
    </ul>
    }
  `,
  styles: `
    li {
      display: flex;
      justify-content: space-between;
      max-width: 400px;
      margin: 7px;
    }
  `,
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);
  todosState = this.store.selectSignal(todosFeature.selectTodosState);
  newTodoText = signal('');

  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  addTodo() {
    this.store.dispatch(TodoActions.addTodo({ text: this.newTodoText() }));
    this.newTodoText.set('');
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }
}
