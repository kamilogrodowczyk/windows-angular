import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  ForbiddenDesktopItemsValidator,
  ForbiddenDesktopItemsValidatorDirective,
} from './forbidden-desktop-items-validator.directive';

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
        appForbiddenName
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

describe('ForbiddenDesktopItemsValidatorDirective', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ForbiddenDesktopItemsValidatorDirective, TestComponent],
      providers: [ForbiddenDesktopItemsValidator],
    }).createComponent(TestComponent);

    component = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
  });

  it('should find one element with directive', async () => {
    const directive = fixture.debugElement.query(
      By.directive(ForbiddenDesktopItemsValidatorDirective)
    );
    expect(directive).toBeTruthy();
  });

  describe('Forbidden Name', () => {
    it('should be fail with forbidden name', async () => {
      const forbiddenName = 'CON'; // no matter which case, control value is changed to lower case
      const input = page.input;

      await fixture.whenStable().then(() => {
        input.value = forbiddenName;
        input.dispatchEvent(new Event('input'));

        form = fixture.debugElement.children[0].injector.get(NgForm);
        control = form.control.get('name');

        expect(input.value).toBe(forbiddenName);
        expect(control?.hasError('forbiddenName')).toBeTruthy();
        expect(control?.valid).toBeFalsy();
        expect(form.valid).toBeFalsy();
      });
    });
  });
  describe('Forbidden Character', () => {
    it('should be fail with forbidden character', async () => {
      const forbiddenCharacter = 'Te?st'; // no matter which case, control value is changed to lower case
      const input = page.input;

      await fixture.whenStable().then(() => {
        input.value = forbiddenCharacter;
        input.dispatchEvent(new Event('input'));

        form = fixture.debugElement.children[0].injector.get(NgForm);
        control = form.control.get('name');

        expect(input.value).toBe(forbiddenCharacter);
        expect(control?.hasError('forbiddenChar')).toBeTruthy();
        expect(control?.valid).toBeFalsy();
        expect(form.valid).toBeFalsy();
      });
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
