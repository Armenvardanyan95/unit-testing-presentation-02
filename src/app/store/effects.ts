import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TodoService } from '../todo.service';
import { TodoActions } from './actions';

export const loadTodos$ = createEffect(() => {
    const actions = inject(Actions);
    const todosService = inject(TodoService);

    return actions.pipe(
      ofType(TodoActions.loadTodos),
      switchMap(() => todosService.getTodos().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) => of(TodoActions.loadTodosError({ error })))
      )),
    );
}, {functional: true});

export const addTodo$ = createEffect(() => {
    const actions = inject(Actions);
    const todosService = inject(TodoService);

    return actions.pipe(
      ofType(TodoActions.addTodo),
      switchMap(({ text }) => todosService.addTodo(text).pipe(
          map((todo) => TodoActions.addTodoSuccess({ todo })),
          catchError((error) => of(TodoActions.addTodoError({ error })))
      )),
    );
}, {functional: true});

export const deleteTodo$ = createEffect(() => {
    const actions = inject(Actions);
    const todosService = inject(TodoService);

    return actions.pipe(
      ofType(TodoActions.deleteTodo),
      switchMap(({ id }) => todosService.deleteTodo(id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id })),
          catchError((error) => of(TodoActions.deleteTodoError({ error })))
      )),
    );
}, {functional: true});

