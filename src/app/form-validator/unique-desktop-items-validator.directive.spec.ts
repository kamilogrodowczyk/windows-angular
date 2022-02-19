import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DesktopItemsService } from '../services/desktop-items.service';
import { TestDesktopItemsService } from '../services/tests/test-desktop-items.service';
import { DesktopItemsValidator } from './desktop-items-validator.service';
import {
  UniqueDesktopItemNameValidator,
  UniqueDesktopItemNameValidatorDirective,
} from './unique-desktop-items-validator.directive';

@Component({
  template: `
    <form #form="ngForm">
      <input
        ngModel
        id="name"
        name="name"
        type="text"
        placeholder="New name"
        #nameClass="ngModel"
        appUniqueDesktopItemName
      />
    </form>
  `,
})
class TestComponent {}

let fixture: ComponentFixture<TestComponent>;
let component: TestComponent;
let page: Page;
let form: NgForm;
let control: AbstractControl | null;
let service: DesktopItemsValidator;

describe('UniqueDesktopItemNameValidatorDirective', async () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [UniqueDesktopItemNameValidatorDirective, TestComponent],
      providers: [
        UniqueDesktopItemNameValidator,
        DesktopItemsValidator,
        { provide: DesktopItemsService, useClass: TestDesktopItemsService },
      ],
    }).createComponent(TestComponent);

    component = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
  });

  it('should find one element with directive', async () => {
    const directive = fixture.debugElement.query(
      By.directive(UniqueDesktopItemNameValidatorDirective)
    );
    expect(directive).toBeTruthy();
  });

  describe('Unique Name', () => {
    beforeEach(async () => {
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
      });
    });
    it('should be fail with already taken name', () => {
      const takenName = 'Folder';
      fixture.detectChanges();
      const input = page.input;

      input.value = takenName;
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      form = fixture.debugElement.children[0].injector.get(NgForm);
      control = form.control.get('name');

      expect(input.value).toBe(takenName);
      expect(control?.hasError('uniqueDesktopItemName')).toBeTruthy();
      expect(control?.valid).toBeFalsy();
      expect(form.valid).toBeFalsy();
    });
  });
});

class Page {
  get input() {
    return this.query<HTMLInputElement>('input');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}
