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
  colorAccent: string = '';
  isChanged: boolean = false;

  ngOnInit(): void {
    this.setNightLight();
    this.setColorAccent();
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

  setColorAccent() {
    const optionsJson = this.storage.get('options') || '{}';
    const value =
      optionsJson !== null ? JSON.parse(optionsJson)['colorAccent'] : '';
    const transparency =
      optionsJson !== null ? JSON.parse(optionsJson)['isTransparent'] : '';
    const theme =
      optionsJson !== null ? JSON.parse(optionsJson)['theme'] : '';

    if (value) {
      document.body.classList.add(`${value}`);
    }

    if (typeof transparency !== 'undefined') {
      if (transparency) {
        document.body.classList.remove('isNotTransparent');
      } else {
        document.body.classList.add('isNotTransparent');
      }
    }

    if (theme === 'Light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }

  hideMenu() {
    this.overlayMenu.hideMenu();
  }
}
