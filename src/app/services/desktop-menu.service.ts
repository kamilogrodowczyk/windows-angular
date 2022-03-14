import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, of, Subject } from 'rxjs';
import { newItem } from '../components/add-element/newItem';
import { desktopItem, desktopItemElement } from '../mocks/desktopItem';
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
  private updateTextDocument = new Subject<boolean>();

  allItems$ = this.allItems.asObservable();
  newTextDocument$ = this.newTextDocument.asObservable();
  updateTextDocument$ = this.updateTextDocument.asObservable();

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

  gg(text: string) {
    const test = new RegExp('' + text + 'd*', 'g');
    return test;
  }

  findTheSameName<T extends { linkName: string }>(
    name: string,
    arr: T[],
    suffix: string = ''
  ): { [key: string]: string } {
    const convertedName = name.replace(/\s/g, '').toLowerCase();
    const regexName = new RegExp('^' + convertedName + '\\d*' + suffix + '$');

    const theSameName = arr.filter((item) => regexName.test(item.linkName));
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

  createNewDocumentFlag(document: boolean) {
    this.newTextDocument.next(document);
  }

  updateDocumentFlag(document: boolean) {
    this.updateTextDocument.next(document);
  }

  createNewDocumentPost(nameValue: string): Observable<DesktopItem> {
    const uniqueValues = this.findTheSameName(nameValue, this.allElements);

    const name = `${uniqueValues['uniqueName']}`;
    const linkName = `${uniqueValues['uniqueLinkName']}`;
    const newItem = { ...desktopItem, name, linkName };

    this.createNewDocumentFlag(false);
    return this.desktopItemsService
      .addDesktopItem(newItem)
      .pipe(mergeMap((item) => this.addElementsToArray(item)));
  }

  createNewDocumentUpdate(
    nameValue: string,
    appElement: DesktopItem,
    documentElement: DesktopItemElement[]
  ): Observable<DesktopItem> {
    const uniqueValues = this.findTheSameName(
      nameValue,
      documentElement,
      '.txt'
    );

    const name = `${uniqueValues['uniqueName']}.txt`;
    const linkName = `${uniqueValues['uniqueLinkName']}.txt`;
    const newItem = { ...desktopItemElement, name, linkName };

    documentElement.push(newItem);
    this.createNewDocumentFlag(false);
    return this.desktopItemsService.updateItem(appElement);
    // .pipe(mergeMap((item) => this.addElementsToArray(item)));
  }
}
