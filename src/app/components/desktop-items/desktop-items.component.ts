import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  subscription: Subscription = new Subscription();
  iconItems: DesktopItem[] = [];

  constructor(
    private desktopMenuService: DesktopMenuService,
    private desktopItemsService: DesktopItemsService,
    private eventService: EventService,
  ) {
    this.subscription = this.desktopMenuService.allItems$.subscribe(
      (items) => (this.iconItems = items)
    );
  }

  ngOnInit(): void {
    this.getItems();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getItems() {
    this.desktopItemsService.getItems().subscribe((items) => {
      this.iconItems = items;
    });
  }

  setIndex(index: number, repeatIndex: number | null = null): number {
    if (repeatIndex && index > repeatIndex) {
      return repeatIndex;
    } else {
      return index;
    }
  }

  getElementName(name: string): void {
    this.eventService.getAppElementName(name);
  }
}
