import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { TestDesktopItemsService } from 'src/app/services/tests/test-desktop-items.service';
import { click } from 'src/tests/click-helper';
import { SpyLocation } from '@angular/common/testing';

import { AddElementComponent } from './add-element.component';

let component: AddElementComponent;
let fixture: ComponentFixture<AddElementComponent>;
let page: Page;

describe('AddElementComponent', () => {
  const locationSpy = createRouterSpy();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddElementComponent],
      providers: [
        { provide: DesktopItemsService, useClass: TestDesktopItemsService },
        { provide: Location, useValue: locationSpy },
        {provide: Location, useClass: SpyLocation}
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddElementComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
    fixture.detectChanges();
  });

  describe('when input has no value', () => {
    it('should have disabled button', () => {
      expect(page.submitButton.disabled).toBeTruthy();
    });
  });

  describe('when input has value', () => {
    it('should not have disabled button', async () => {
      const nameInput = page.nameInput;
      const btn = page.submitButton;

      await fixture.whenStable().then(() => {
        // Add value to input
        nameInput.value = 'test';
        nameInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        expect(btn.disabled).toBeFalsy();

        // Remove value from input
        nameInput.value = '';
        nameInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        expect(btn.disabled).toBeTruthy();
      });
    });

    it('should save new desktop item and not navigate', async () => {
      const nameInput = page.nameInput;
      const btn = page.submitButton;
      const testValue = 'test';
      const service = fixture.debugElement.injector.get(DesktopItemsService);
      const addSpy = spyOn(service, 'addDesktopItem').and.callThrough();

      await fixture.whenStable().then(() => {
        // Add value to input
        nameInput.value = testValue;
        nameInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        expect(component.name).toBe(testValue);

        click(btn);
        expect(addSpy.calls.any())
          .withContext('desktopItemsService.addDesktopItems called')
          .toBe(true);
      });
    });

    it('should navigate when bew desktop item saved', async () => {
      const nameInput = page.nameInput;
      const btn = page.submitButton;
      const testValue = 'test';
      let location: Location = TestBed.inject(Location);

      await fixture.whenStable().then(() => {
        // Add value to input
        nameInput.value = testValue;
        nameInput.dispatchEvent(new Event('input'));

        click(btn);
        fixture.detectChanges();
        // expect(page.backSpy).toHaveBeenCalledTimes(1)
      });
    });
  });
});

function createRouterSpy() {
  return jasmine.createSpyObj('Location', ['back']);
}

class Page {
  // getter properties wait to query the DOM until called.
  get submitButton() {
    return this.query<HTMLButtonElement>('button');
  }
  get select() {
    return this.query<HTMLSelectElement>('select');
  }
  get nameDisplay() {
    return this.query<HTMLLabelElement>('label');
  }
  get nameInput() {
    return this.query<HTMLInputElement>('input');
  }

  backSpy: jasmine.Spy;

  constructor(someFixture: ComponentFixture<AddElementComponent>) {
    // get the navigate spy from the injected router spy object
    const locationSpy = someFixture.debugElement.injector.get(Location) as any;
    this.backSpy = locationSpy.navigate;
  }

  //// query helpers ////
  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}
