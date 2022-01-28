import { SpyLocation } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { getTestDesktopItems } from 'src/app/services/tests/test-desktop-items';
import { TestDesktopItemsService } from 'src/app/services/tests/test-desktop-items.service';
import { DesktopItem } from 'src/app/types/desktopItems';
import { ActivatedRouteStub } from 'src/tests/activated-route-stub';
import { click } from 'src/tests/click-helper';

import { ActionsComponent } from './actions.component';

let component: ActionsComponent;
let fixture: ComponentFixture<ActionsComponent>;
let activatedRoute: ActivatedRouteStub;
let page: Page;

describe('ActionsComponent', () => {
  beforeEach(async () => {
    activatedRoute = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ActionsComponent],
      providers: [
        { provide: DesktopItemsService, useClass: TestDesktopItemsService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Location, useClass: SpyLocation },
      ],
    }).compileComponents();
  });

  let expectedItem: DesktopItem;
  const testElement = getTestDesktopItems()[2];
  beforeEach(async () => {
    expectedItem = testElement;
    activatedRoute.setParamMap({ appIcon: expectedItem.linkName });
    createComponent();
  });

  describe('when element is rendered', () => {
    it('should create form to update desktop item', () => {
      expect(page.label).withContext('label should be displayed').toBeTruthy();
      expect(page.submitButton)
        .withContext('button should be displayed')
        .toBeTruthy();
      fixture.whenStable().then(() => {
        expect(page.input.value)
          .withContext('input value should be equal `Folder`')
          .toBe(expectedItem.name);
      });
    });
  });

  describe('when input value is changed', () => {
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
    it('should be changed linkName of desktop item as well', () => {
      const testValue = 'Link Name Test';
      changeInputValue(testValue);
      click(page.submitButton);
      expect(component.iconName.linkName).toBe('linknametest');
    });

    it('should be disabled button if no input value', () => {
      const btn = page.submitButton;
      expect(btn.disabled).toBeFalse();

      changeInputValue('');
      expect(btn.disabled).toBeTrue();
    });

    it('should save updated desktop item and call updateItem', () => {
      const service = fixture.debugElement.injector.get(DesktopItemsService);
      const addSpy = spyOn(service, 'updateItem').and.callThrough();

      const btn = page.submitButton;
      const testInputValue = 'test';
      changeInputValue(testInputValue);

      click(btn);
      expect(addSpy.calls.any())
        .withContext('should call desktopItemsService.updateItem')
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

async function createComponent() {
  fixture = TestBed.createComponent(ActionsComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();
  await fixture.whenStable().then(() => {
    fixture.detectChanges();
  });
}

function changeInputValue(inputValue: string = 'test'): void {
  const nameInput = page.input;

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
  get label() {
    return this.query<HTMLLabelElement>('label');
  }
  get input() {
    return this.query<HTMLInputElement>('input');
  }

  //// query helpers ////
  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}
