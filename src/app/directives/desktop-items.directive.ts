import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Directive({
  selector: '[appDesktopMenu]',
  exportAs: 'dMenu',
})
export class DesktopItemsDirective {
  @Input() debounceTime = 300;
  @Output() debounceClick = new EventEmitter(true);
  private clicks: Subject<MouseEvent> = new Subject<MouseEvent>();
  private subscription: Subscription = new Subscription();

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
  clickEvent(e: any) {
    e.preventDefault();
    this.clicks.next(e);
  }
}
