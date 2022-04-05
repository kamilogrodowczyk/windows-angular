import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFolder, faHdd } from '@fortawesome/free-solid-svg-icons';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { DesktopItem } from 'src/app/types/desktopItems';

@Component({
  selector: 'app-thispc',
  templateUrl: './thispc.component.html',
  styleUrls: ['./thispc.component.scss'],
})
export class ThispcComponent implements OnInit {
  faComputer = faHdd;
  faFolder = faFolder;
  apps: DesktopItem[] = [];
  isOpen: boolean = true;
  thisPc!: DesktopItem

  constructor(
    private desktopItemsService: DesktopItemsService,
    private desktopMenuService: DesktopMenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getItems()
    this.getThisPc();
  }

  getThisPc(): void {
    this.desktopItemsService.getItem('thispc').subscribe((item) => {
      this.thisPc = item;
      this.desktopMenuService.getSelectedApps(item)
    });
  }

  getItems() {
    this.desktopItemsService
      .getItems()
      .subscribe((items) => (this.apps = items));
  }

  openDesktopItem(linkName: string) {
    this.router.navigate([linkName]);
  }
}
