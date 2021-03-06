import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { Component, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { debounceTime } from 'rxjs';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { TestScheduler } from 'rxjs/testing';
import { routes } from '../app-routing.module';
import { DesktopMenuComponent } from '../components/desktop-menu/desktop-menu.component';
import { DesktopItemsDirective } from './desktop-items.directive';

@Component({
  template: `
    <div appDesktopMenu [debounceTime]="0" (debounceClick)="testClick()">
      Click
    </div>
    <div appDesktopMenu (debounceClick)="testClick()">Click</div>
    <div appDesktopMenu [debounceTime]="600" (debounceClick)="testClick()">
      Click
    </div>
    <div>Click</div>
    <button>{{ isOpen ? 'isOpen' : 'isClosed' }}</button>
  `,
})
class TestComponent {
  isOpen: boolean = false;
  testClick() {
    this.isOpen = true;
  }
}

let fixture: ComponentFixture<TestComponent>;
let component: TestComponent;
let des: DebugElement[];
let btn: DebugElement;
let directive: DesktopItemsDirective;
let scheduler: TestScheduler;

describe('DesktopItemsDirective', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DesktopItemsDirective, TestComponent, DesktopMenuComponent],
      imports: [RouterTestingModule.withRoutes(routes), OverlayModule, HttpClientModule],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(DesktopItemsDirective));
    btn = fixture.debugElement.query(By.css('button'));
    directive = des[1].injector.get(DesktopItemsDirective);
  });

  it('should have three elements with directive selector', () => {
    expect(des.length).toBe(3);
  });

  it('should be called `clickEvent()` on right click', () => {
    const event = new MouseEvent('contextmenu');
    spyOn(event, 'preventDefault');
    des[0].triggerEventHandler('contextmenu', event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  describe('when element contains customProperty - 1st element', () => {
    it('should have event with no delay', fakeAsync(() => {
      setElementWithDelay(0, 0);
      expect(btn.nativeElement.textContent).toBe('isOpen');
    }));

    it('should fn be called', fakeAsync(() => {
      const testClick = spyOn(component, 'testClick');
      setElementWithDelay(0, 0);
      expect(testClick).toHaveBeenCalled();
    }));
  });

  describe('when element contains customProperty - 2nd element', () => {
    it('should have event with no delay', fakeAsync(() => {
      // default delay - 300
      setElementWithDelay(300, 1);
      expect(btn.nativeElement.textContent).toBe('isOpen');
    }));

    it('should fn be called', fakeAsync(() => {
      const testClick = spyOn(component, 'testClick');
      setElementWithDelay(300, 1);
      expect(testClick).toHaveBeenCalledWith();
    }));
  });

  describe('when element contains customProperty - 3rd element', () => {
    it('should have event with no delay', fakeAsync(() => {
      setElementWithDelay(600, 2);
      expect(btn.nativeElement.textContent).toBe('isOpen');
    }));

    it('should fn be called', fakeAsync(() => {
      const testClick = spyOn(component, 'testClick');
      setElementWithDelay(600, 2);
      expect(testClick).toHaveBeenCalled();
    }));
  });

  describe('Marble Test', () => {
    beforeEach(() => {
      scheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
    });

    it('cold - debounceTime', () => {
      scheduler.run((helpers) => {
        const { cold, expectObservable, time } = helpers;
        const input$ = '      -a------b-c-----|';
        const t = time('       ---|');
        //                            ---| - another source emission
        //                              ---|
        const expected = '    ----a--------c--|';

        const result = cold(input$).pipe(debounceTime(t));
        expectObservable(result).toBe(expected);
      });
    });

    it('should generate stream correctly', () => {
      scheduler.run((helpers) => {
        const { cold, expectObservable, flush } = helpers;

        const event = new MouseEvent('contextmenu');
        const value = { x: event };
        const source$: ColdObservable<MouseEvent> = cold('-x----', value);
        directive.debounceTime = 3;

        source$.subscribe(() => directive.clickEvent(event));
        expectObservable(directive.getClickEvent$()).toBe('----x-', value);
      });
    });
  });
});

function setElementWithDelay(delay: number, elementIndex: number) {
  const noDelayEvent = des[elementIndex].nativeElement;

  noDelayEvent.dispatchEvent(new Event('contextmenu'));
  tick(delay);
  fixture.detectChanges();
}
