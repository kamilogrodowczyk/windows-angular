import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';

import { DesktopMenuComponent } from './desktop-menu.component';
import { AppComponent } from 'src/app/app.component';
import { click } from 'src/tests/click-helper';
import { OverlayDesktopMenuService } from 'src/app/services/overlay-desktop-menu.service';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Router } from '@angular/router';

let component: DesktopMenuComponent;
let fixture: ComponentFixture<DesktopMenuComponent>;
let httpClient: HttpClient;
let hideMenuSpy: jasmine.Spy;
let location: Location;
let router: Router;
let page: Page;

// INFO: removed mat-button

const options: string[] = [
  'Refresh',
  'Open',
  'Change name',
  'New folder',
  'Remove',
];

describe('DesktopMenuComponent', () => {
  const overlayService = jasmine.createSpyObj('OverlayDesktopMenuService', [
    'hideMenu',
  ]);
  hideMenuSpy = overlayService.hideMenu;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesktopMenuComponent, AppComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        OverlayModule,
      ],
      providers: [
        { provide: OverlayDesktopMenuService, useValue: overlayService },
        { provide: Location, useClass: SpyLocation },
      ],
    })
      .compileComponents()
      .then(createComponent);
  });

  it('should create', async () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(component).toBeTruthy();
    expect(buttons.length).toBe(5);
  });

  it('should find button `Refresh`', () => {
    const btnRefresh = page.buttons[0];
    expect(btnRefresh.textContent).toContain('Refresh');
  });

  it('should find button `Refresh`', () => {
    const steFnSpy = spyOn(component, 'setFn');
    const btnRemove = page.buttons[4];
    click(btnRemove);
    expect(steFnSpy).toHaveBeenCalledOnceWith('Remove');
  });

  it('should find button `Refresh`', fakeAsync(() => {
    const testIcon = 'test';
    hideMenuSpy.and.returnValue(testIcon);
    const btnOpen = page.buttons[1];
    click(btnOpen);
    updateToNewPath();
    expectPathToBe(`/${testIcon}`);
  }));
});

function createComponent() {
  fixture = TestBed.createComponent(DesktopMenuComponent);
  component = fixture.componentInstance;
  component.service.menuItems = options;
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
