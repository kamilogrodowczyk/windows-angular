import { Component } from '@angular/core';
import { OverlayDesktopMenuService } from './services/overlay-desktop-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private overlayMenu: OverlayDesktopMenuService) {}
  
  showMenu(event: MouseEvent) {
    this.overlayMenu.showTask(event);
  }

  hideMenu() {
    this.overlayMenu.hideTask();
  }
}
