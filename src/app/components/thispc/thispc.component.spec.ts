import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThispcComponent } from './thispc.component';

describe('ThispcComponent', () => {
  let component: ThispcComponent;
  let fixture: ComponentFixture<ThispcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThispcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThispcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
