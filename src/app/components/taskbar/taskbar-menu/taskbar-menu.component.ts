import { Component, Input, OnInit } from '@angular/core';
import {
  faBars,
  faCog,
  faFile,
  faFolder,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { TaskbarApps } from 'src/app/mocks/taskbarApps';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem } from 'src/app/types/desktopItems';
import { TaskbarApp } from 'src/app/types/taskbarApp';

@Component({
  selector: 'app-taskbar-menu',
  templateUrl: './taskbar-menu.component.html',
  styleUrls: ['./taskbar-menu.component.scss'],
})
export class TaskbarMenuComponent implements OnInit {
  @Input() isOpen: boolean = false;
  isOpenLeftbar: boolean = false;

  faPowerOff = faPowerOff;
  faBars = faBars;
  faCog = faCog;
  faFile = faFile;
  faFolder = faFolder;

  apps: (DesktopItem | TaskbarApp)[] = TaskbarApps;
  firstLetterOfApp: string[] = [];

  constructor(private desktopItemsService: DesktopItemsService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.desktopItemsService.getItems().subscribe((i) => {
      this.apps = [...i, ...this.apps].sort((a, b) =>
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0
      );
      this.apps.map((l) => this.firstLetterOfApp.push(l.name[0].toUpperCase()));
    });
  }
}
