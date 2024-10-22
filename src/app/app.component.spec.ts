import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { todosFeature, TodosState } from './store/todos.feature';
import { TodoActions } from './store/actions';

describe('AppComponent', () => {
  let store: MockStore;
  let fixture: ComponentFixture<AppComponent>;
  let componentInstance: AppComponent;
  let state: MemoizedSelector<any, TodosState, DefaultProjectorFn<TodosState>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    componentInstance = fixture.componentInstance;
    state = store.overrideSelector(todosFeature.selectTodosState, {
      todos: [
        {
          userId: 1,
          id: 1,
          title: 'Title 1',
          completed: false,
        },
      ],
      loading: false,
      error: null,
    });
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('AppComponent should display todos', () => {
    const items = fixture.debugElement.queryAll(By.css('li'));
    expect(items.length).toBe(1);
    expect(items[0].nativeElement.textContent).toContain('Title 1');
  });

  it('AppComponent should display loading', () => {
    state.setResult({
      todos: [],
      loading: true,
      error: null,
    });
    store.refreshState();
    fixture.detectChanges();
    const loadingSpan = fixture.debugElement.query(By.css('span'));
    expect(loadingSpan).toBeTruthy();
    expect(loadingSpan.nativeElement.textContent).toContain('Loading...');
  });

  it('AppComponent should display error', () => {
    state.setResult({
      todos: [],
      loading: false,
      error: 'Error',
    });
    store.refreshState();
    fixture.detectChanges();
    const errorSpan = fixture.debugElement.query(By.css('span'));
    expect(errorSpan).toBeTruthy();
    expect(errorSpan.nativeElement.textContent).toContain('Error');
  });

  it('AppComponent should add todo', () => {
    spyOn(store, 'dispatch');
    const addTodoButton = fixture.debugElement.query(By.css('button'));
    componentInstance.newTodoText.set('Title 2');
    addTodoButton.triggerEventHandler('click', null);
    expect(store.dispatch).toHaveBeenCalledWith(
      TodoActions.addTodo({ text: 'Title 2' })
    );
  });

  it('AppComponent should delete todo', () => {
    spyOn(store, 'dispatch');
    const deleteTodoButton = fixture.debugElement.query(By.css('.delete-todo'));
    deleteTodoButton.triggerEventHandler('click', null);
    expect(store.dispatch).toHaveBeenCalledWith(
      TodoActions.deleteTodo({ id: 1 })
    );
  });
});
