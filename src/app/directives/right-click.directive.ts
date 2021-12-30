import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[rightClickHost]',
})
export class RightClickDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
