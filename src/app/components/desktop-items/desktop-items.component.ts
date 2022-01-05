import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { DesktopItems, DesktopItemsCustom } from 'src/app/mocks/desktopItems';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';

@Component({
  selector: 'app-desktop-items',
  templateUrl: './desktop-items.component.html',
  styleUrls: ['./desktop-items.component.scss'],
})
export class DesktopItemsComponent implements OnInit {
  items = DesktopItems;
  customItems = DesktopItemsCustom;

  left: string = '';
  top: string = '';

  constructor(public desktopMenuService: DesktopMenuService) {}

  ngOnInit(): void {}

  setPosition(e: MouseEvent) {
    e.preventDefault();
    [this.left, this.top] = [`${e.clientX}px`, `${e.clientY}px`];
  }
}
