import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, of, Subject } from 'rxjs';
import { newItem } from '../components/add-element/newItem';
import { desktopMenu } from '../mocks/desktopMenu';
import { DesktopItem, DesktopItemElement } from '../types/desktopItems';
import { DesktopItemsService } from './desktop-items.service';
import { BrowserStorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class DesktopMenuService {
  private allItems = new Subject<DesktopItem[]>();
  private newTextDocument = new Subject<boolean>();

  allItems$ = this.allItems.asObservable();
  newTextDocument$ = this.newTextDocument.asObservable();

  menuItems: string[] = [];
  anchorItems: boolean[] = [];

  recycleBin!: DesktopItem;
  allElements: DesktopItem[] = [];
  itemToCopy!: DesktopItem;

  getItems(index: number) {
    this.menuItems = desktopMenu[index].name;
    this.anchorItems = desktopMenu[index].anchor;
  }

  clearItems() {
    this.menuItems = [];
  }

  constructor(
    private desktopItemsService: DesktopItemsService,
    private storage: BrowserStorageService
  ) {
    this.getAllDesktopItems();
    // this.sort();
  }

  // Service

  getAllItems(items: DesktopItem[]) {
    this.allItems.next(items);
  }

  sort(option: string) {
    this.desktopItemsService
      .sortItems(option)
      .subscribe((items) => this.allItems.next(items));
  }

  // Remove element from desktop and add to recycle bin

  getAllDesktopItems() {
    this.desktopItemsService
      .getItems()
      .subscribe((items) => (this.allElements = items));
    this.desktopItemsService
      .getItemById(1)
      .subscribe((item) => (this.recycleBin = item));
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
      );
  }

  // Empty recycle bin

  clearRecycleBin() {
    this.recycleBin.elements = [];
    this.desktopItemsService.updateItem(this.recycleBin).subscribe();
  }

  // Copy folder

  copy(linkName: string) {
    this.desktopItemsService.getItem(linkName).subscribe((item) => {
      delete item.id;
      this.itemToCopy = item;
    });
  }

  // Paste folder

  findTheSameName<T extends { linkName: string }>(
    name: string,
    arr: T[]
  ): { [key: string]: string } {
    const theSameName = arr.filter((item) => item.linkName.includes(name.replace(/\s/g, '').toLowerCase()));
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
    if (!this.itemToCopy) return;
    const uniqueValues = this.findTheSameName<DesktopItem>(
      `${this.itemToCopy.name} — copy`,
      this.allElements
    );
    const copiedElement: DesktopItem = {
      icon: this.itemToCopy.icon,
      name: uniqueValues['uniqueName'],
      linkName: uniqueValues['uniqueLinkName'],
      elements: this.itemToCopy.elements,
    };

    return this.desktopItemsService
      .addDesktopItem(copiedElement)
      .pipe(mergeMap((item) => this.addElementsToArray(item)));
  }

  // New text document

  createNewDocument(document: boolean) {
    this.newTextDocument.next(document);
  }
}
