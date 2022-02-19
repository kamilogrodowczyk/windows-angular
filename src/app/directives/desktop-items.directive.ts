import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { debounceTime, Observable, Subject, Subscription } from 'rxjs';
import { DesktopMenuService } from '../services/desktop-menu.service';
import { OverlayDesktopMenuService } from '../services/overlay-desktop-menu.service';

@Directive({
  selector: '[appDesktopMenu]',
  exportAs: 'dMenu',
})
export class DesktopItemsDirective {
  @Input() debounceTime = 300;
  @Input() desktopMenuIndex: number = 3;
  @Output() debounceClick = new EventEmitter(true);
  private clicks: Subject<MouseEvent> = new Subject<MouseEvent>();
  private subscription: Subscription = new Subscription();

  constructor(
    private overlayRef: OverlayDesktopMenuService,
    private service: DesktopMenuService
  ) {}

  ngOnInit() {
    this.subscription = this.getClickEvent$().subscribe((e) => {
      this.overlayRef.showMenu(e);
      this.service.getItems(this.desktopMenuIndex);
      this.debounceClick.emit(e);
    });
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
    e.stopPropagation();
    this.clicks.next(e);
  }
}
