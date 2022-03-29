import { Injectable } from '@angular/core';
import { forkJoin, mergeMap, Observable, of, Subject } from 'rxjs';
import { desktopItem, desktopItemElement } from '../mocks/desktopItem';
import { desktopMenu } from '../mocks/desktopMenu';
import { DesktopItem, DesktopItemElement } from '../types/desktopItems';
import { DesktopItemsService } from './desktop-items.service';
import { BrowserStorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class DesktopMenuService {

  // Desktop Menu
  menuItems: string[] = [];
  anchorItems: boolean[] = [];

  getItems(index: number) {
    this.menuItems = desktopMenu[index].name;
    this.anchorItems = desktopMenu[index].anchor;
  }

  clearItems() {
    this.menuItems = [];
  }

  // Desktop Items — Subjects 
  private allApps = new Subject<DesktopItem[]>();
  private allDocuments = new Subject<DesktopItemElement[]>();
  private textDocumentToCreate = new Subject<boolean>();
  private textDocumentToUpdate = new Subject<boolean>();

  getAllItems(items: DesktopItem[]) {
    this.allApps.next(items);
  }

  getAllDocuments(items: DesktopItemElement[]) {
    this.allDocuments.next(items);
  }

  createNewDocumentFlag(document: boolean) {
    this.textDocumentToCreate.next(document);
  }

  updateDocumentFlag(document: boolean) {
    this.textDocumentToUpdate.next(document);
  }

  // Desktop Items — Observables
  allApps$ = this.allApps.asObservable();
  allDocuments$ = this.allDocuments.asObservable();
  textDocumentToCreate$ = this.textDocumentToCreate.asObservable();
  textDocumentToUpdate$ = this.textDocumentToUpdate.asObservable();

  // Desktop Items — Variables
  recycleBin!: DesktopItem;
  allAppsInArray: DesktopItem[] = [];
  itemToCopy!: DesktopItem;


  constructor(
    private desktopItemsService: DesktopItemsService,
  ) {
    this.getAllDesktopItems();
  }

  // Remove element and add to recycle bin

  getAllDesktopItems() {
    this.desktopItemsService
      .getItems()
      .subscribe((items) => (this.allAppsInArray = items));
    this.desktopItemsService
      .getItemById(1)
      .subscribe((item) => (this.recycleBin = item));
  }

  // --- 1 --- Remove app from desktop

  updateElementsOnDesktop(item: DesktopItem): Observable<DesktopItem> {
    this.recycleBin?.elements.push(item);
    this.allAppsInArray = this.allAppsInArray.filter((el) => el.id !== item.id);

    this.getAllItems(this.allAppsInArray);

    return of(item);
  }

  onRemoveClick(iconName: string) {
    return this.desktopItemsService
      .getItem(iconName)
      .pipe(
        mergeMap((item) =>
          forkJoin([
            this.updateElementsOnDesktop(item),
            this.desktopItemsService.deleteItem(item.id),
            this.desktopItemsService.updateItem(this.recycleBin),
          ])
        )
      );
  }

  // --- 2 --- Remove text document from folder

  updateElementsinFolder(
    item: DesktopItem,
    linkName: string
  ): Observable<DesktopItem> {
    const elementToRecycleBin = item.elements.filter((el) => el.linkName === linkName)[0];
    this.recycleBin?.elements.push(elementToRecycleBin);
    item.elements = item.elements.filter((el) => el.linkName !== linkName);
    let elToUpdate = this.allAppsInArray.findIndex(
      (i) => i.id === item.id
    );
    this.allAppsInArray[elToUpdate] = item;
    this.getAllDocuments(this.allAppsInArray[elToUpdate].elements);
    return of(item);
  }

  removeDocument(iconName: string, linkName: string) {
    return this.desktopItemsService
      .getItem(iconName)
      .pipe(
        mergeMap((item) =>
          forkJoin([
            this.updateElementsinFolder(item, linkName),
            this.desktopItemsService.updateItem(item),
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
    this.allAppsInArray.push(newElement);
    this.getAllItems(this.allAppsInArray);
    return of(newElement);
  }

  updateElementInArray(element: DesktopItem) {
    let elToUpdate = this.allAppsInArray.findIndex(
      (item) => item.id === element.id
    );
    this.allAppsInArray[elToUpdate] = element;
    this.getAllItems(this.allAppsInArray);
    return of(element);
  }

  paste(): Observable<DesktopItem> | undefined {
    if (!this.itemToCopy) return;
    const uniqueValues = this.findTheSameName<DesktopItem>(
      `${this.itemToCopy.name} — copy`,
      this.allAppsInArray
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

  createNewApp(nameValue: string): Observable<DesktopItem> {
    const name = nameValue;
    const linkName = nameValue.replace(/\s/g, '').toLowerCase();
    const newItem = { ...desktopItem, name, linkName };

    return this.desktopItemsService
      .addDesktopItem(newItem)
      .pipe(mergeMap((item) => this.addElementsToArray(item)));
  }

  updateApp(nameValue: string, selectedItem: DesktopItem) {
    const name = nameValue;
    const linkName = nameValue.replace(/\s/g, '').toLowerCase();
    selectedItem = { ...selectedItem, name, linkName };

    this.updateDocumentFlag(false);
    return this.desktopItemsService
      .updateItem(selectedItem)
      .pipe(mergeMap((item) => this.updateElementInArray(item)));
  }

  createNewTextDocument(
    nameValue: string,
    appElement: DesktopItem,
    documentElement: DesktopItemElement[]
  ): Observable<DesktopItem> {
    const name = `${nameValue}.txt`;
    const linkName = `${name.replace(/\s/g, '').toLowerCase()}`;
    const newItem = { ...desktopItemElement, name, linkName };

    documentElement.push(newItem);
    this.createNewDocumentFlag(false);
    return this.desktopItemsService.updateItem(appElement);
  }

  // Sort

  sort(option: string) {
    this.desktopItemsService
      .sortItems(option)
      .subscribe((items) => this.allApps.next(items));
  }
}
