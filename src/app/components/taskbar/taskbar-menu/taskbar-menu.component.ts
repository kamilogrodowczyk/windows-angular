import { Component, Input, OnInit } from '@angular/core';
import { faBars, faCog, faFile, faFolder, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem } from 'src/app/types/desktopItems';

@Component({
  selector: 'app-taskbar-menu',
  templateUrl: './taskbar-menu.component.html',
  styleUrls: ['./taskbar-menu.component.scss']
})
export class TaskbarMenuComponent implements OnInit {
  @Input() isOpen: boolean = false;
  isOpenLeftbar: boolean = false;

  faPowerOff = faPowerOff;
  faBars = faBars;
  faCog = faCog;
  faFile = faFile;
  faFolder = faFolder;

  apps: DesktopItem[] = [];
  firstLetterOfApp: string[] = []

  constructor(private desktopItemsService: DesktopItemsService) { }

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
