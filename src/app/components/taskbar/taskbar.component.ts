import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { DesktopItem } from 'src/app/types/desktopItems';
import { WindowsSettings } from 'src/app/types/windowsSettings';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss'],
})
export class TaskbarComponent implements OnInit {
  faWindows = faWindows as IconProp;
  faFolder = faFolder;
  today: number = Date.now();

  isOpen: boolean = false;
  selectedApps: (DesktopItem | WindowsSettings)[] = []
  selectedApp!: DesktopItem | WindowsSettings

  constructor(private menuService: DesktopMenuService) {
    this.menuService.selectedApps$.subscribe(app => this.selectedApps = app);
    this.menuService.selectedApp$.subscribe(app => this.selectedApp = app);
  }

  ngOnInit(): void {}
}
