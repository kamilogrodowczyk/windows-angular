import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem, DesktopItemElement } from 'src/app/types/desktopItems';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss'],
})
export class NotepadComponent implements OnInit {
  text: string = '';
  name: string = '';
  selectedItem: DesktopItemElement[] = [];
  currentItem!: DesktopItemElement;

  constructor(
    private route: ActivatedRoute,
    private service: DesktopItemsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      this.getSelectedItem(p.get('appIcon'), p.get('document'));
    });
  }

  getSelectedItem(
    appLinkName: string | null,
    textLinkName: string | null
  ): void {
    if (!appLinkName || !textLinkName) {
      this.selectedItem = [];
      return;
    }
    this.service.getItem(appLinkName).subscribe((item) => {
      this.selectedItem = item.elements;
      const element = item.elements.filter(
        (i) => i.linkName === textLinkName
      )[0];
      this.text = element.content;
      this.name = element.name;
    });
  }

  goBack() {
    this.location.back();
  }
}
