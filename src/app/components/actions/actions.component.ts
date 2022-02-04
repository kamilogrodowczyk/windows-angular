import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem } from 'src/app/types/desktopItems';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  iconName!: DesktopItem;

  constructor(
    private route: ActivatedRoute,
    private service: DesktopItemsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((p) => this.getItem(p.get('appIcon')));
  }

  getItem(linkName: string | null): void {
    if (!linkName) return;
    this.service.getItem(linkName).subscribe((icon) => (this.iconName = icon));
  }

  updateLinkName(iconName: DesktopItem): void {
    if (!iconName) return;
    iconName['linkName'] = iconName.name.replace(/\s/g, '').toLowerCase();
  }

  onSubmit(e: MouseEvent): void {
    e.preventDefault();
    if (this.iconName) {
      this.updateLinkName(this.iconName);
      this.service.updateItem(this.iconName).subscribe(() => this.location.back());
    }
  }
}
