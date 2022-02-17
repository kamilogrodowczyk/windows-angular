import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DesktopItemsService } from '../services/desktop-items.service';

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

  isDesktopItemNameTaken(desktopItemName: string): Observable<boolean> {
    this.getAllItems();
    const isTaken = this.allItems.includes(desktopItemName);

    return of(isTaken).pipe(delay(400));
  }
}
