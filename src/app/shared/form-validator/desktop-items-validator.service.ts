import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DesktopItemsService } from '../../services/desktop-items.service';

@Injectable({ providedIn: 'root' })
export class DesktopItemsValidator {
  allItems: string[] = [];
  constructor(private service: DesktopItemsService) {}

  getAllItems() {
    this.service
      .getItems()
      .subscribe((items) =>
        items.map((item) => this.allItems.push(item.linkName))
      );
  }

  getAllDocumentsInFolder(folder: string) {
    this.service
      .getItem(folder)
      .subscribe((item) =>
        item.elements.map((document) => this.allItems.push(document.linkName))
      );
  }

  isDesktopItemNameTaken(desktopItemName: string, folder: string = ''): Observable<boolean> {
    if(folder) {
      this.getAllDocumentsInFolder(folder);
    } else {
      this.getAllItems();
    }
    const isTaken = this.allItems.includes(desktopItemName);

    return of(isTaken);
  }
}
