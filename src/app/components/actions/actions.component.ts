import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesktopItemsDirective } from 'src/app/directives/desktop-items.directive';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem } from 'src/app/types/desktopItems';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  iconName?: DesktopItem;

  constructor(
    private route: ActivatedRoute,
    private service: DesktopItemsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    const linkName = String(this.route.snapshot.paramMap.get('appIcon'));
    this.service
      .getItem(linkName)
      .subscribe((icon) => (this.iconName = icon));
  }

  changeLinkName() {
    if (this.iconName) {
      this.iconName['linkName'] = this.iconName.name
        .replace(/\s/g, '')
        .toLowerCase();
    }
  }

  updateIconName() {
    if (this.iconName) {
      this.service
        .updateItem(this.iconName)
        .subscribe(() => this.location.back());
    }
  }
}
