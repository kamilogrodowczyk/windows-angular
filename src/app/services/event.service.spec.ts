import { TestBed } from '@angular/core/testing';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { TestScheduler } from 'rxjs/testing';

import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventService);
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate stream correctly', () => {
    scheduler.run((helpers) => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const appName = 'testAppName';
      const input$: ColdObservable<string> = cold('-a|', { a: appName });
      input$.subscribe(() => service.getAppElementName(appName));

      expectObservable(service.appElement$).toBe('-a', { a: appName });
      expectSubscriptions(input$.subscriptions).toBe('^-!');
    });
  });
});
