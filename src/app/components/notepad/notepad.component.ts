import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  Subject,
  switchMap,
} from 'rxjs';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { DesktopItem, DesktopItemElement } from 'src/app/types/desktopItems';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss'],
})
export class NotepadComponent implements OnInit {
  text: string = '';
  name: string = '';
  selectedItem!: DesktopItemElement;
  currentItem!: DesktopItem;
  private newContent = new Subject<string>();
  isSavedText: string = 'Saved';

  constructor(
    private route: ActivatedRoute,
    private service: DesktopItemsService,
    private location: Location,
    private menuService: DesktopMenuService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      this.getSelectedItem(p.get('appIcon'), p.get('document'));
    });
  }

  addNewContent() {
    this.newContent.next(this.text);
    this.selectedItem.content = this.text;
    this.selectedItem.characters = this.text.length;
    this.newContent
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((i) =>
          forkJoin([
            this.service.updateItem(this.currentItem),
            (this.isSavedText = 'Saving...'),
          ])
        )
      )
      .subscribe(() =>
        setTimeout(() => {
          this.isSavedText = 'Saved';
        }, 1500)
      );
  }

  getSelectedItem(
    appLinkName: string | null,
    textLinkName: string | null
  ): void {
    if (!appLinkName || !textLinkName) {
      return;
    }
    this.service.getItem(appLinkName).subscribe((item) => {
      this.currentItem = item;
      const element = item.elements.length && item.elements.filter(
        (i) => i.linkName === textLinkName
      )[0];
      this.selectedItem = element;
      this.text = element.content;
      this.name = `${element.name}`;
      this.menuService.getSelectedApps({
        icon: element.icon,
        name: element.name,
        linkName: `${item.linkName}/notepad/${element.linkName}`,
      });
    });
  }

  goBack() {
    this.location.back();
  }
}
