import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Directive({
  selector: '[appDesktopItems]',
})
export class DesktopItemsDirective {
  @Input() debounceTime = 300;
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject();
  private subscription: Subscription = new Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.clicks
      .pipe(debounceTime(this.debounceTime))
      .subscribe((e) => this.debounceClick.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('contextmenu', ['$event'])
  clickEvent(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.clicks.next(e);
  }
}
