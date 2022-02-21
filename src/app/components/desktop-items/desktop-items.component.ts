import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdditionalDesktopMenuService } from 'src/app/services/additional-desktop-menu.service';
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
  subscriptionAddiotionalMenu: Subscription = new Subscription();
  iconItems: DesktopItem[] = [];
  sizeOption: string = localStorage.getItem('option') || '';

  constructor(
    private desktopMenuService: DesktopMenuService,
    private desktopItemsService: DesktopItemsService,
    private eventService: EventService,
    private router: Router,
    private additionalDesktopMenu: AdditionalDesktopMenuService
  ) {
    this.subscription = this.desktopMenuService.allItems$.subscribe(
      (items) => (this.iconItems = items)
    );
    this.subscriptionAddiotionalMenu =
      this.additionalDesktopMenu.sizeState$.subscribe(
        (option) => (this.sizeOption = option)
      );
  }

  ngOnInit(): void {
    this.getItems();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionAddiotionalMenu.unsubscribe();
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

  openDesktopItem(linkName: string) {
    this.router.navigate([linkName]);
  }
}
