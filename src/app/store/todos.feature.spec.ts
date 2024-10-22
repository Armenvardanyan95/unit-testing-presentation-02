import { TodoActions } from './actions';
import { todosFeature } from './todos.feature';

describe('Todos feature', () => {
  const reducer = todosFeature.reducer;

  it('should toggle loading when adding todo', () => {
    const state = reducer(undefined, TodoActions.addTodo({ text: 'Title 1' }));
    expect(state).toEqual({
      todos: [],
      loading: true,
      error: null,
    });
  });

  it('should toggle loading when deleting todo', () => {
    const state = reducer(undefined, TodoActions.deleteTodo({ id: 1 }));
    expect(state).toEqual({
      todos: [],
      loading: true,
      error: null,
    });
  });

  it('should add todo', () => {
    const state = reducer(
      undefined,
      TodoActions.addTodoSuccess({
        todo: { id: 1, title: 'Title 1', userId: 1, completed: false },
      })
    );
    expect(state).toEqual({
      todos: [{ id: 1, title: 'Title 1', userId: 1, completed: false }],
      loading: false,
      error: null,
    });
  });

  it('should delete todo', () => {
    const state = reducer(
      {
        todos: [{ id: 1, title: 'Title 1', userId: 1, completed: false }],
        loading: false,
        error: null,
      },
      TodoActions.deleteTodoSuccess({ id: 1 })
    );
    expect(state).toEqual({
      todos: [],
      loading: false,
      error: null,
    });
  });
});
