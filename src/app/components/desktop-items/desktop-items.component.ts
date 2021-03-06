import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AdditionalDesktopMenuService } from 'src/app/directives/additional-desktop-menu.service';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { EventService } from 'src/app/services/event.service';
import { BrowserStorageService } from 'src/app/services/storage.service';
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
  sizeOption: string = '';

  updatedDocument: boolean = false;
  name: string = 'New folder';
  folder = faFolder;
  currentName: string = '';
  selectedApp!: DesktopItem

  constructor(
    private desktopMenuService: DesktopMenuService,
    private desktopItemsService: DesktopItemsService,
    private eventService: EventService,
    private router: Router,
    private additionalDesktopMenu: AdditionalDesktopMenuService,
    private storage: BrowserStorageService
  ) {
    this.subscription = this.desktopMenuService.allApps$.subscribe(
      (items) => (this.iconItems = items)
    );
    this.subscriptionAddiotionalMenu =
      this.additionalDesktopMenu.sizeState$.subscribe(
        (option) => (this.sizeOption = option)
      );

    this.desktopMenuService.textDocumentToUpdate$.subscribe(
      (newItem) => (this.updatedDocument = newItem)
    );
  }

  ngOnInit(): void {
    this.getItems();
    this.getStorageOptions();
    this.desktopMenuService.getSelectedApp({} as DesktopItem)
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

  getStorageOptions() {
    const optionsJson = this.storage.get('options') || '{}';
    this.sizeOption =
      optionsJson !== null ? JSON.parse(optionsJson)['size'] : '';
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
    this.currentName = name;
    this.desktopItemsService.getItem(name).subscribe(name => this.selectedApp = name)
  }

  openDesktopItem(linkName: string) {
    this.router.navigate([linkName]);
  }
 }
