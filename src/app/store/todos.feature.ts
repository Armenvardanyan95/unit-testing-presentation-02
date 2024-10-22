import { createFeature, createReducer, on } from '@ngrx/store';
import { Todo } from '../todo.service';
import { TodoActions } from './actions';

export type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

export const todosReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
    error: null,
  })),
  on(TodoActions.loadTodosError, (state, { error }) => ({    
    ...state,
    loading: false,
    error,
  })),

  on(TodoActions.addTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodoActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [todo, ...state.todos],
    loading: false,
    error: null,
  })),
  on(TodoActions.addTodoError, (state, { error }) => ({    
    ...state,
    loading: false,
    error,
  })),

  on(TodoActions.deleteTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
    loading: false,
    error: null,
  })),
  on(TodoActions.deleteTodoError, (state, { error }) => ({    
    ...state,
    loading: false,
    error,
  })),
);

export const todosFeature = createFeature({
    name: 'Todos',
    reducer: todosReducer,
});
