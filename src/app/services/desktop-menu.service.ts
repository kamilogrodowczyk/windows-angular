import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, of, Subject } from 'rxjs';
import { newItem } from '../components/add-element/newItem';
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
  itemToCopy!: DesktopItem;

  getItems(index: number) {
    this.menuItems = desktopMenu[index].name;
    this.anchorItems = desktopMenu[index].anchor;
    // this.getAllDesktopItems();
  }

  clearItems() {
    this.menuItems = [];
  }

  constructor(private desktopItemsService: DesktopItemsService) {
    this.getAllDesktopItems();
  }

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

  updateElementsinArray(item: DesktopItem): Observable<DesktopItem> {
    this.recycleBin?.elements.push(item);
    this.allElements = this.allElements.filter((el) => el.id !== item.id);

    this.getAllItems(this.allElements);

    return of(item);
  }

  onRemoveClick(iconName: string) {
    return this.desktopItemsService
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
  }

  // Empty recycle bin

  clearRecycleBin() {
    this.recycleBin.elements = [];
    this.desktopItemsService.updateItem(this.recycleBin).subscribe();
  }

  // Copy folder

  copy(linkName: string) {
    this.desktopItemsService
      .getItem(linkName)
      .subscribe((item) => {
        delete item.id;
        this.itemToCopy = item;
      });
  }

  // Paste folder

  findTheSameName(name: string): { [key: string]: string } {
    const theSameName = this.allElements.filter((item) =>
      item.name.includes(name)
    );
    const uniqueName = theSameName.length
      ? `${name} ${theSameName.length + 1}`
      : name;
    const uniqueLinkName = uniqueName.replace(/\s/g, '').toLowerCase();
    return { uniqueName, uniqueLinkName };
  }

  addElementsToArray(newElement: DesktopItem) {
    this.allElements.push(newElement);
    this.getAllItems(this.allElements);
    return of(newElement);
  }

  paste(): Observable<DesktopItem> | undefined {
    if(!this.itemToCopy) return;
    const uniqueValues = this.findTheSameName(`${this.itemToCopy.name} — copy`);
    const copiedElement: DesktopItem = {
      icon: this.itemToCopy.icon,
      name: uniqueValues['uniqueName'],
      linkName: uniqueValues['uniqueLinkName'],
      elements: this.itemToCopy.elements,
    };

    return this.desktopItemsService
      .addDesktopItem(copiedElement)
      .pipe(mergeMap((item) => this.addElementsToArray(item)))
  }
}
