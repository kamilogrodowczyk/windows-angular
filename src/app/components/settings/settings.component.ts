import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { windowsSettings } from 'src/app/mocks/windowsSettings';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { WindowsSettings } from 'src/app/types/windowsSettings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settings: WindowsSettings[] = windowsSettings;
  settingsApp: WindowsSettings = {
    icon: 'cog',
    name: 'Settings',
    linkName: 'settings',
  };

  constructor(
    private location: Location,
    private menuService: DesktopMenuService
  ) {}

  ngOnInit(): void {
    this.menuService.getSelectedApps(this.settingsApp);
    this.menuService.getSelectedApp(this.settingsApp);
  }

  minimalize() {
    this.location.back();
  }

  goBack() {
    this.location.back();
    this.menuService.removeSelectedApp(this.settingsApp)
  }
}
