import { Injectable } from '@angular/core';
import { mergeMap, Observable, of, Subject } from 'rxjs';
import { desktopMenu } from '../mocks/desktopMenu';
import { DesktopItem } from '../types/desktopItems';
import { DesktopItemsService } from './desktop-items.service';

@Injectable({
  providedIn: 'root',
})
export class DesktopMenuService {
  private allItems = new Subject<DesktopItem[]>();

  allItems$ = this.allItems.asObservable();

  menuItems: string[] = [];
  anchorItems: boolean[] = [];
  recycleBin?: DesktopItem;
  allElements: DesktopItem[] = [];

  getItems(index: number) {
    this.menuItems = desktopMenu[index].name;
    this.anchorItems = desktopMenu[index].anchor;
  }

  clearItems() {
    this.menuItems = [];
  }

  constructor(private desktopItemsService: DesktopItemsService) {}

  // Service

  getAllItems(items: DesktopItem[]) {
    this.allItems.next(items);
  }

  // Remove element from desktop and add to recycle bin

  getAllDesktopItems() {
    this.desktopItemsService.getItems().subscribe((items) => {
      this.allElements = items;
    });
  }

  getRecycleBin() {
    this.desktopItemsService
      .getItem('recyclebin')
      .subscribe((item) => (this.recycleBin = item));
  }

  updateElementsinArray(item: DesktopItem): Observable<DesktopItem> {
    this.recycleBin?.elements.push(item);
    this.allElements = this.allElements.filter((el) => el.id !== item.id);

    this.getAllItems(this.allElements);

    return of(item);
  }

  onRemoveClick(iconName: string) {
    this.getAllDesktopItems();
    this.getRecycleBin();
    this.desktopItemsService
      .getItem(iconName)
      .pipe(
        mergeMap((item) => this.updateElementsinArray(item)),
        mergeMap((item) => this.desktopItemsService.deleteItem(item.id)),
        mergeMap(() =>
          this.recycleBin
            ? this.desktopItemsService.updateItem(this.recycleBin)
            : []
        )
      )
      .subscribe();
  }
}
