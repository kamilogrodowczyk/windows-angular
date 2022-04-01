import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarMenuComponent } from './taskbar-menu.component';

describe('TaskbarMenuComponent', () => {
  let component: TaskbarMenuComponent;
  let fixture: ComponentFixture<TaskbarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskbarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskbarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
