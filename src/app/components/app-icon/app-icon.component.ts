import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItemElement } from 'src/app/types/desktopItems';

@Component({
  selector: 'app-app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
})
export class AppIconComponent implements OnInit {
  appElements: DesktopItemElement[] = [];

  constructor(
    private service: DesktopItemsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAppElement();
  }

  getAppElement() {
    const linkName = String(this.route.snapshot.paramMap.get('appIcon'));
    this.service
      .getItem(linkName)
      .subscribe((items) => (this.appElements = items[0].elements));
  }
}
