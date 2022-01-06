import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DesktopItems, DesktopItemsCustom } from 'src/app/mocks/desktopItems';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';

@Component({
  selector: 'app-desktop-items',
  templateUrl: './desktop-items.component.html',
  styleUrls: ['./desktop-items.component.scss'],
})
export class DesktopItemsComponent implements OnInit {
  @Output() newIndex = new EventEmitter();

  items = DesktopItems;
  customItems = DesktopItemsCustom;

  constructor(private desktopMenuService: DesktopMenuService) {}

  ngOnInit(): void {}

  setIndex(index: number) {
    this.newIndex.emit(index);
    this.desktopMenuService.getItems(index);
  }
}
