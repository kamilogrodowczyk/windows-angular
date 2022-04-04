import { Component, DoCheck } from '@angular/core';
import { OverlayDesktopMenuService } from './services/overlay-desktop-menu.service';
import { BrowserStorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements DoCheck {
  iconRoute: string = '';
  expandedFlag: boolean = false;
  nightLightValue: string = '';
  isChanged: boolean = false;

  ngOnInit(): void {
    this.setNightLight();
  }

  ngDoCheck() {
    if (this.isChanged) {
      this.setNightLight();
    }
  }

  constructor(
    private overlayMenu: OverlayDesktopMenuService,
    private storage: BrowserStorageService
  ) {
    this.storage
      .getStorageSubject()
      .subscribe((item) =>
        item ? (this.isChanged = true) : (this.isChanged = false)
      );
  }

  setNightLight() {
    const optionsJson = this.storage.get('options') || '{}';
    const value =
      optionsJson !== null ? JSON.parse(optionsJson)['nightDisplayValue'] : '0';
    const isActive =
      optionsJson !== null ? JSON.parse(optionsJson)['nightDisplay'] : false;
    this.nightLightValue = isActive ? value : '0';
  }

  hideMenu() {
    this.overlayMenu.hideMenu();
  }
}
