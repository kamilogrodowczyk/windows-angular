import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { EventService } from 'src/app/services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
})
export class DesktopMenuComponent implements OnInit {
  @Input() left: string = '';
  @Input() top: string = '';

  iconName: string = '';
  subscription: Subscription = new Subscription();

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(
    public service: DesktopMenuService,
    private eventService: EventService,
    private router: Router
  ) {
    this.subscription = this.eventService.appElement$.subscribe(
      (name) => (this.iconName = name.replace(/\s/g, '').toLowerCase())
    );
  }

  setFn(item: string) {
    switch (item) {
      case 'Refresh':
        window.location.reload();
        break;
      case 'Open':
        this.router.navigate([this.iconName]);
        break;
      case 'Change name':
        this.router.navigate([this.iconName, 'changename']);
        break;
      case 'New folder':
        this.router.navigate(['desktop', 'newfolder']);
        break;
      case 'Remove':
        this.service.onRemoveClick(this.iconName);
        break;
      default:
        return;
    }
  }
}
