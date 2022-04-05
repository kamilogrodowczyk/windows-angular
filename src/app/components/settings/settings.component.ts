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
    private menuService: DesktopMenuService
  ) {}

  ngOnInit(): void {
    this.menuService.updateSelectedApp(
      'Settings',
      'settings',
      this.settingsApp
    );
  }
}
