import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem, DesktopItemElement } from 'src/app/types/desktopItems';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { Location } from '@angular/common';
import { EventService } from 'src/app/services/event.service';
import { OverlayDesktopMenuService } from 'src/app/services/overlay-desktop-menu.service';

@Component({
  selector: 'app-app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
})
export class AppIconComponent implements OnInit {
  newDocument: boolean = false;
  name: string = 'New document';
  documentElement: DesktopItemElement[] = [];
  appElement!: DesktopItem;
  suffix: string = '.txt';
  forbiddenApp: string = 'recyclebin'

  constructor(
    private service: DesktopItemsService,
    private menuService: DesktopMenuService,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private overlay: OverlayDesktopMenuService
  ) {
    this.menuService.textDocumentToCreate$.subscribe(
      (newItem) => (this.newDocument = newItem)
    );
    this.menuService.allDocuments$.subscribe(
      (items) => (this.documentElement = items)
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) =>
      this.getSelectedItem(p.get('appIcon'))
    );
  }

  getSelectedItem(linkName: string | null): void {
    if (!linkName) {
      this.documentElement = [];
      return;
    }
    this.service.getItem(linkName).subscribe((item) => {
      this.appElement = item;
      this.documentElement = item.elements;
      this.menuService.getSelectedApps(item)
    });
  }

  openDocument(file: string) {
    if (this.appElement.linkName === 'recyclebin') return;
    this.router.navigate([this.appElement.linkName, 'notepad', file]);
  }

  contextMenu(e: any) {
    e.preventDefault();
    if (this.appElement.linkName === 'recyclebin')
      this.menuService.clearItems();
      this.overlay.hideMenu();
  }

  getElementName(name: string): void {
    this.eventService.getAppElementName(this.appElement.linkName, name);
  }
}
