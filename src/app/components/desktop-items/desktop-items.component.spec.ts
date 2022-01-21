import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopItemsComponent } from './desktop-items.component';

describe('DesktopItemsComponent', () => {
  let component: DesktopItemsComponent;
  let fixture: ComponentFixture<DesktopItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
