import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { DesktopItemsValidator } from './desktop-items-validator.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UniqueDesktopItemNameValidator implements AsyncValidator {
  constructor(private service: DesktopItemsValidator) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const value = control.value.replace(/\s/g, '').toLowerCase();
    return this.service.isDesktopItemNameTaken(value).pipe(
      map(isTaken => (isTaken ? { uniqueDesktopItemName: true } : null)),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appUniqueDesktopItemName]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueDesktopItemNameValidatorDirective),
      multi: true
    }
  ]
})
export class UniqueDesktopItemNameValidatorDirective implements AsyncValidator {
  constructor(private validator: UniqueDesktopItemNameValidator) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/