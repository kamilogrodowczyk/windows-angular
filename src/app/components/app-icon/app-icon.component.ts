import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem, DesktopItemElement } from 'src/app/types/desktopItems';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { Location } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
})
export class AppIconComponent implements OnInit {
  file = faFile;
  newDocument: boolean = false;
  name: string = 'New document';
  isError: any;

  @ViewChild('input', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.value = this.name;
      element.nativeElement.focus();
      element.nativeElement.setSelectionRange(
        0,
        element.nativeElement.value.length
      );
    }
  }

  constructor(
    private service: DesktopItemsService,
    private menuService: DesktopMenuService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.menuService.newTextDocument$.subscribe(
      (newItem) => (this.newDocument = newItem)
    );
  }

  selectedItem: DesktopItemElement[] = [];
  mainItem!: DesktopItem;

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
    this.service.getItem(linkName).subscribe((item) => {
      this.mainItem = item;
      this.selectedItem = item.elements;
    });
  }

  createNewDocument() {
    if (!this.newDocument || this.isError) return;
    const uniqueValues = this.menuService.findTheSameName<DesktopItemElement>(
      `${this.name}`,
      this.selectedItem
    );
    const newItem: DesktopItemElement = {
      icon: 'file',
      name: `${uniqueValues['uniqueName']}.txt`,
      linkName: uniqueValues['uniqueLinkName'],
      content: '',
      type: 'Text document',
      characters: 0,
    };
    if (this.newDocument) {
      this.selectedItem.push(newItem);
    }
    this.service.updateItem(this.mainItem).subscribe();
    this.menuService.createNewDocument(false);
  }

  openDocument(file: string) {
    this.router.navigate([this.mainItem.linkName, 'notepad', file]);
  }

  goBack() {
    this.location.back();
  }
}
