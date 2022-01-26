import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { defer, Observable, of } from 'rxjs';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem, DesktopItemElement } from 'src/app/types/desktopItems';

@Component({
  selector: 'app-app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
})
export class AppIconComponent implements OnInit {
  constructor(
    private service: DesktopItemsService,
    private route: ActivatedRoute,
  ) {}

  selectedItem: DesktopItemElement[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) =>
      this.getSelectedItem(p.get('appIcon'))
    );
  }

  getSelectedItem(linkName: string | null): void {
    if (!linkName) {
      this.selectedItem = [];
      return;
    }
    this.service
      .getItem(linkName)
      .subscribe((item) => (this.selectedItem = item.elements));
  }
}
