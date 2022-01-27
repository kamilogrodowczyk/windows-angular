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

export * from "@fortawesome/angular-fontawesome";
export * from "@fortawesome/fontawesome-svg-core";
export * from "@fortawesome/free-regular-svg-icons";

let component: AddElementComponent;
let fixture: ComponentFixture<AddElementComponent>;
let page: Page;

describe('AddElementComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddElementComponent],
      providers: [
        { provide: DesktopItemsService, useClass: TestDesktopItemsService },
        { provide: Location, useClass: SpyLocation },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddElementComponent);
    component = fixture.componentInstance;
    page = new Page();
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
  });

  describe('when desktopItemsService is injected', () => {
    let testService: TestDesktopItemsService;
    let location: SpyLocation;
    beforeEach(async () => {
      testService = fixture.debugElement.injector.get(
        DesktopItemsService
      ) as any;
      location = fixture.debugElement.injector.get(Location) as any;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
      });
    });

    it('should save new desktop item after submit', async () => {
      const findNewItem = (newItemName: string): boolean => {
        return testService.desktopItems.some((n) => n.name === newItemName);
      };

      const btn = page.submitButton;
      const testInputValue = 'test';
      changeInputValue(testInputValue);

      fixture.detectChanges();
      expect(findNewItem(testInputValue))
        .withContext('should not add new item via service')
        .toBeFalsy();

      click(btn);
      expect(findNewItem(testInputValue))
        .withContext('should add new item via service')
        .toBeTruthy();
    });

    it('should save new desktop item and call addDesktopItem', () => {
      const service = fixture.debugElement.injector.get(DesktopItemsService);
      const addSpy = spyOn(service, 'addDesktopItem').and.callThrough();

      const btn = page.submitButton;
      const testInputValue = 'test';
      changeInputValue(testInputValue);

      expect(component.name).toBe(testInputValue);

      click(btn);
      expect(addSpy.calls.any())
        .withContext('should call desktopItemsService.addDesktopItems')
        .toBe(true);
    });

    it('should save new desktop item and back by location.back', () => {
      const locationBack = spyOn(component, 'back');

      const btn = page.submitButton;
      changeInputValue();

      click(btn);
      expect(locationBack).toHaveBeenCalled();
    });
  });
});

function changeInputValue(inputValue: string = 'test'): void {
  const nameInput = page.nameInput;

  // Add value to input
  nameInput.value = inputValue;
  nameInput.dispatchEvent(new Event('input'));

  fixture.detectChanges();
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

  //// query helpers ////
  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}
