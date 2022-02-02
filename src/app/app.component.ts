import { Component } from '@angular/core';
import { OverlayDesktopMenuService } from './services/overlay-desktop-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  iconRoute: string = '';
  expandedFlag: boolean = false;

  ngOnInit(): void {}

  constructor(private overlayMenu: OverlayDesktopMenuService) {}

  showMenu(event: MouseEvent) {
    this.overlayMenu.showMenu(event);
  }

  hideMenu() {
    this.overlayMenu.hideMenu();
  }
}
