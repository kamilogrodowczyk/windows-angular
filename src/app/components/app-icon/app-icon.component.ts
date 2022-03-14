import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem, DesktopItemElement } from 'src/app/types/desktopItems';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { Location } from '@angular/common';
import { EventService } from 'src/app/services/event.service';

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

  constructor(
    private service: DesktopItemsService,
    private menuService: DesktopMenuService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private eventService: EventService
  ) {
    this.menuService.newTextDocument$.subscribe(
      (newItem) => (this.newDocument = newItem)
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
    });
  }

  openDocument(file: string) {
    if (this.appElement.linkName === 'recyclebin') return;
    this.router.navigate([this.appElement.linkName, 'notepad', file]);
  }

  getElementName(name: string): void {
    this.eventService.getAppElementName(this.appElement.linkName, name);
  }

  goBack() {
    this.location.back();
  }
}
