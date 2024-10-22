import {
    createActionGroup,
    emptyProps,
    props
} from '@ngrx/store';
import { Todo } from '../todo.service';

export const TodoActions = createActionGroup({
  source: 'Todos',
  events: {
    'Load Todos': emptyProps(),
    'Load Todos Success': props<{ todos: Todo[] }>(),
    'Load Todos Error': props<{ error: string }>(),
    'Add Todo': props<{ text: string }>(),
    'Add Todo Success': props<{ todo: Todo }>(),
    'Add Todo Error': props<{ error: string }>(),
    'Delete Todo': props<{ id: number }>(),
    'Delete Todo Success': props<{ id: number }>(),
    'Delete Todo Error': props<{ error: string }>(),
  },
});
