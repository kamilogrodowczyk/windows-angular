import { OverlayModule } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { DesktopItemsDirective } from 'src/app/directives/desktop-items.directive';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { getTestDesktopItems } from 'src/app/services/tests/test-desktop-items';
import { TestDesktopItemsService } from 'src/app/services/tests/test-desktop-items.service';
import { AddElementComponent } from '../add-element/add-element.component';
import { AppIconComponent } from '../app-icon/app-icon.component';
import { DesktopMenuComponent } from '../desktop-menu/desktop-menu.component';

import { DesktopItemsComponent } from './desktop-items.component';

let component: DesktopItemsComponent;
let fixture: ComponentFixture<DesktopItemsComponent>;
let page: Page;
let router: Router;
let location: SpyLocation;

const desktopItems = getTestDesktopItems();

describe('DesktopItemsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DesktopItemsComponent,
        AddElementComponent,
        DesktopItemsDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule.withRoutes(routes), OverlayModule],
      providers: [
        {
          provide: DesktopItemsService,
          useClass: TestDesktopItemsService,
        },
      ],
    })
      .compileComponents()
      .then(createComponent);
  });
  const expectedItem = desktopItems[0];

  describe('when component is rendered', () => {
    it('should display desktop items', () => {
      expect(page.buttons.length).toBeGreaterThan(0);
    });

    it('1st desktop item should match 1st test desktop item', () => {
      const itemOnPage = page.paragraphs[0].textContent;

      expect(itemOnPage)
        .withContext('1st item in service should be 1st item on page')
        .toContain(expectedItem.name);
    });
  });

  describe('when route is changed', () => {
    it('should navigate to Desktop Item - main view', fakeAsync(() => {
      tick();
      expectPathToBe('/');
      expect(DesktopItemsComponent).toBeTruthy();
    }));

    it('should navigate to `Action Component` - view of selected one element', fakeAsync(() => {
      const firstElement = page.links[0]; // Recycle Bin
      const firstElementLink = `/${desktopItems[0].linkName}`; // recyclebin

      firstElement.click();
      updateToNewPath();

      expectPathToBe(firstElementLink);
      expect(AppIconComponent).toBeTruthy();
    }));

    it('should navigate to `Action Component` with location URL change - view of selected one element', fakeAsync(() => {
      const firstElement = page.links[0];
      const firstElementLink = `/${desktopItems[0].linkName}`;

      location.go(firstElementLink);
      updateToNewPath();

      expectPathToBe(firstElementLink);
      expect(AppIconComponent).toBeTruthy();
    }));
  });

  describe('when contextmenu event is called on desktop item', () => {
    it('should find `DesktopItemDirective` with By.directive', () => {
      const firstAnchor = fixture.debugElement.queryAll(By.css('a'));
      const directive = fixture.debugElement.queryAll(
        By.directive(DesktopItemsDirective)
      );
      expect(firstAnchor[0]).toBe(directive[0]);
    });

    it('should be called `DesktopItemDirective` with `debounceClick` fn', fakeAsync(() => {
      const firstElement = page.links[0]; // first item in DesktopItem
      firstElement.dispatchEvent(new Event('contextmenu'));

      tick(300);
      fixture.detectChanges();

      expect(DesktopMenuComponent).toBeTruthy();
    }));
  });
});

function createComponent() {
  fixture = TestBed.createComponent(DesktopItemsComponent);
  component = fixture.componentInstance;
  page = new Page();

  const injector = fixture.debugElement.injector;
  location = injector.get(Location) as SpyLocation;
  router = injector.get(Router);
  router.initialNavigation();

  fixture.detectChanges();
}

function expectPathToBe(path: string, expectationFailOutput?: any) {
  expect(location.path())
    .withContext(expectationFailOutput || 'location.path()')
    .toEqual(path);
}

function updateToNewPath() {
  tick(); // wait while navigating
  fixture.detectChanges(); // update view
  tick();
}

class Page {
  get paragraphs() {
    return this.queryAll<HTMLParagraphElement>('p');
  }
  get links() {
    return this.queryAll<HTMLAnchorElement>('a');
  }
  get container() {
    return this.queryAll<HTMLElement>('.container__elements');
  }
  get nameDisplay() {
    return this.query<HTMLElement>('p');
  }

  get buttons() {
    return this.queryAll<HTMLButtonElement>('button');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}
