import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { FORBIDDEN_CHARACTERS, FORBIDDEN_NAMES } from './forbiddenValues';

@Injectable({ providedIn: 'root' })
export class ForbiddenDesktopItemsValidator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const isForbiddenChar = FORBIDDEN_CHARACTERS.some((word) =>
      new RegExp(word, 'i').test(control.value)
    );

    const value = control.value ? control.value.toLowerCase() : control.value;
    const isForbiddenName = FORBIDDEN_NAMES.includes(value);
    if (isForbiddenChar) {
      return { forbiddenChar: { value: control.value } };
    } else if (isForbiddenName) {
      return { forbiddenName: { value: control.value } };
    } else return null;
  }
}

@Directive({
  selector: '[appForbiddenName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ForbiddenDesktopItemsValidatorDirective),
      multi: true,
    },
  ],
})
export class ForbiddenDesktopItemsValidatorDirective {
  constructor(private validator: ForbiddenDesktopItemsValidator) {}

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator.validate(control);
  }
}
