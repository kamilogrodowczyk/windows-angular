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
  @Input() length = 0;
  @Input() iconName = '';
  @Output() debounceClick = new EventEmitter(true);
  private clicks = new Subject();
  private subscription: Subscription = new Subscription();

  public left: string = '';
  public top: string = '';

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

  setPosition(e: any) {
    const minWidth = 200;
    const minHeight = 45 * this.length;
    const screenWidth = window.screen.width - minWidth;
    const screenHeight = window.innerHeight - minHeight;

    [this.left, this.top] = [`${e.clientX}px`, `${e.clientY}px`];

    if (screenWidth < e.clientX) {
      this.left = `${e.clientX - minWidth}px`;
    }

    if (screenHeight < e.clientY) {
      this.top = `${e.clientY - minHeight}px`;
    }
  }
}
