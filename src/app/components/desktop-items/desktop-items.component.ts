import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { EventService } from 'src/app/services/event.service';
import { DesktopItem } from '../../types/desktopItems';

@Component({
  selector: 'app-desktop-items',
  templateUrl: './desktop-items.component.html',
  styleUrls: ['./desktop-items.component.scss'],
})
export class DesktopItemsComponent implements OnInit {
  @Output() getRoute = new EventEmitter();

  iconItems: DesktopItem[] = [];
  defaultIconItems: DesktopItem[] = [];

  constructor(
    private desktopMenuService: DesktopMenuService,
    private desktopItemsService: DesktopItemsService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.desktopItemsService.getItems().subscribe((items) => {
      this.iconItems = items;
    });
  }

  setIndex(index: number, repeatIndex: number | null = null) {
    if (repeatIndex && index > repeatIndex) {
      this.desktopMenuService.getItems(repeatIndex);
    } else {
      this.desktopMenuService.getItems(index);
    }
  }

  getElementName(name: string): void {
    this.eventService.getAppElementName(name);
  }
}
