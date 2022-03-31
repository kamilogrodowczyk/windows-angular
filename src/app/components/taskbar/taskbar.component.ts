import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import {
  faPowerOff,
  faBars,
  faCog,
  faFile,
  faFolder,
} from '@fortawesome/free-solid-svg-icons';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem } from 'src/app/types/desktopItems';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss'],
})
export class TaskbarComponent implements OnInit {
  faWindows = faWindows;
  faPowerOff = faPowerOff;
  faBars = faBars;
  faCog = faCog;
  faFile = faFile;
  faFolder = faFolder;

  today: number = Date.now();

  apps: DesktopItem[] = [];
  firstLetterOfApp: string[] = []
  isOpen: boolean = false;
  isOpenLeftbar: boolean = false;

  constructor(private desktopItemsService: DesktopItemsService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.desktopItemsService
      .getItems()
      .subscribe(
        (i) => {
          (this.apps = i.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          ));
          ((i.map(l => this.firstLetterOfApp.push(l.name[0].toUpperCase()))));
        }
      );
  }
}
