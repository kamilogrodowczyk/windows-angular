import { Component, OnInit } from '@angular/core';
import { DesktopItems } from 'src/app/mocks/desktopItems';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { DesktopItemCustom } from '../../types/desktopItems';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-desktop-items',
  templateUrl: './desktop-items.component.html',
  styleUrls: ['./desktop-items.component.scss'],
})
export class DesktopItemsComponent implements OnInit {
  items = DesktopItems;
  faFolder = faFolder;

  customItems: DesktopItemCustom[] = [];

  constructor(
    private desktopMenuService: DesktopMenuService,
    private desktopItemsService: DesktopItemsService
  ) {}

  ngOnInit(): void {
    this.getCustomItems();
  }

  getCustomItems() {
    this.desktopItemsService
      .getCustomItems()
      .subscribe((items) => (this.customItems = items));
  }

  setIndex(index: number) {
    this.desktopMenuService.getItems(index);
  }

  createRoute(item: string) {
    return item.replace(/\s/g, '').toLowerCase();
  }
}
