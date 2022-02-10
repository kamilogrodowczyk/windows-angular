import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { debounceTime, Observable, Subject, Subscription } from 'rxjs';

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
    this.subscription = this.getClickEvent$().subscribe((e) =>
      this.debounceClick.emit(e)
    );
  }

  getClickEvent$(): Observable<MouseEvent> {
    return this.clicks.asObservable().pipe(debounceTime(this.debounceTime));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.clicks.complete();
  }

  @HostListener('contextmenu', ['$event'])
  clickEvent(e: any) {
    e.preventDefault();
    this.clicks.next(e);
  }
}
