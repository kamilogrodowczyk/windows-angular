import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem, DesktopItemElement } from 'src/app/types/desktopItems';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';

@Component({
  selector: 'app-app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
})
export class AppIconComponent implements OnInit {
  file = faFile;
  newDocument: boolean = false;
  name: string = 'New document';

  constructor(
    private service: DesktopItemsService,
    private menuService: DesktopMenuService,
    private route: ActivatedRoute,
    private router: Router
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
    const uniqueValues = this.menuService.findTheSameName<DesktopItemElement>(
      `${this.name}`,
      this.selectedItem
    );
    // this.name = uniqueValues['uniqueName'];
    console.log(this.name)
    const newItem: DesktopItemElement = {
      icon: 'file',
      name: uniqueValues['uniqueName'],
      linkName: uniqueValues['uniqueLinkName'],
      content: '',
      type: 'Text document',
      characters: 0,
    };
    if(this.newDocument) {
      this.selectedItem.push(newItem);
    }
    this.service.updateItem(this.mainItem).subscribe();
    this.menuService.createNewDocument(false);
  }

  test(e: any) {
    (e.target as HTMLInputElement).select();
  }

  openDocument(file: string) {
    this.router.navigate([this.mainItem.linkName, 'notepad', file])
  }
}
