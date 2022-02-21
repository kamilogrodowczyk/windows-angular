import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appViewSize]',
})
export class ViewSizeDesktopItemsDirective {
  fontSize = '1.5rem';
  @Input('appViewSize') ex = "{'font-size': '1.5rem'}";

  constructor() {}
}
