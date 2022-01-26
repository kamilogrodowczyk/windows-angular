import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { getTestDesktopItems } from 'src/app/services/tests/test-desktop-items';
import { TestDesktopItemsService } from 'src/app/services/tests/test-desktop-items.service';
import { DesktopItem } from 'src/app/types/desktopItems';
import { ActivatedRouteStub } from 'src/tests/activated-route-stub';

import { AppIconComponent } from './app-icon.component';

let activatedRoute: ActivatedRouteStub;
let component: AppIconComponent;
let fixture: ComponentFixture<AppIconComponent>;
let page: Page;

describe('AppIconComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('elements passing to active route', getElementsForLinkName);
});

const firstElement = getTestDesktopItems()[2];

function getElementsForLinkName(): void {
  const routerSpy = createRouterSpy();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppIconComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: DesktopItemsService, useClass: TestDesktopItemsService },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  describe('navigating to one desktop item', () => {
    let expectedElements: DesktopItem;

    beforeEach(async () => {
      expectedElements = firstElement;
      activatedRoute.setParamMap({ appIcon: expectedElements.linkName });
      await createComponent();
    });

    it('should display all paragraphs and all containers', () => {
      const paragraphs = page.paragraphs;
      expect(paragraphs.length).toBe(6);

      const paragraphsContainer = page.container;
      expect(paragraphsContainer.length).toBe(2);
    });

    it("should display element's info", () => {
      const paragraphName = page.paragraphs[3];
      const paragraphType = page.paragraphs[4];
      const paragraphSize = page.paragraphs[5];

      expect(paragraphName.textContent).toBe('Text 1');
      expect(paragraphType.textContent).toBe('Text document');
      expect(paragraphSize.textContent).toBe('17 characters');
    });
  });
}

function createRouterSpy() {
  return jasmine.createSpyObj('Router', ['navigate']);
}

class Page {
  get paragraphs() {
    return this.queryAll<HTMLElement>('p');
  }
  get container() {
    return this.queryAll<HTMLElement>('.container__elements');
  }
  get nameDisplay() {
    return this.query<HTMLElement>('p');
  }

  navigateSpy: jasmine.Spy;

  constructor(someFixture: ComponentFixture<AppIconComponent>) {
    // get the navigate spy from the injected router spy object
    const routerSpy = someFixture.debugElement.injector.get(Router) as any;
    this.navigateSpy = routerSpy.navigate;
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

function createComponent(): void {
  fixture = TestBed.createComponent(AppIconComponent);
  component = fixture.componentInstance;
  page = new Page(fixture);

  fixture.detectChanges(); // ngOnInit
}
