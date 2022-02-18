import { Injectable } from '@angular/core';
import { forkJoin, mergeMap, Observable, of, Subject } from 'rxjs';
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
  recycleBin!: DesktopItem;
  allElements: DesktopItem[] = [];

  getItems(index: number) {
    this.menuItems = desktopMenu[index].name;
    this.anchorItems = desktopMenu[index].anchor;
    this.getAllDesktopItems();
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
      this.recycleBin = items[0];
    });
  }

  clearRecycleBin() {
    this.recycleBin.elements = [];
    this.desktopItemsService.updateItem(this.recycleBin).subscribe();
  }

  updateElementsinArray(item: DesktopItem): Observable<DesktopItem> {
    this.recycleBin?.elements.push(item);
    this.allElements = this.allElements.filter((el) => el.id !== item.id);

    this.getAllItems(this.allElements);

    return of(item);
  }

  onRemoveClick(iconName: string) {
    this.desktopItemsService
      .getItem(iconName)
      .pipe(
        mergeMap((item) =>
          forkJoin([
            this.updateElementsinArray(item),
            this.desktopItemsService.deleteItem(item.id),
            this.desktopItemsService.updateItem(this.recycleBin),
          ])
        )
      )
      .subscribe();
  }
}
