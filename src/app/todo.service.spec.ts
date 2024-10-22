import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), TodoService],
    });

    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todos', () => {
    service.getTodos().subscribe((todos) => {
      expect(todos).toEqual([
        {
          userId: 1,
          id: 1,
          title: 'Title 1',
          completed: false,
        },
      ]);
    });

    const req = httpTestingController.expectOne({
      url: 'https://jsonplaceholder.typicode.com/todos',
      method: 'GET',
    });
    req.flush([
      {
        userId: 1,
        id: 1,
        title: 'Title 1',
        completed: false,
      },
    ]);

    httpTestingController.verify();
  });
});
