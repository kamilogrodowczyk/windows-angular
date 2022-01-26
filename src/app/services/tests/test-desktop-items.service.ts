import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DesktopItem } from 'src/app/types/desktopItems';
import { DesktopItemsService } from '../desktop-items.service';
import { getTestDesktopItems } from './test-desktop-items';

@Injectable({
  providedIn: 'root',
})
export class TestDesktopItemsService extends DesktopItemsService {
  constructor() {
    super(null!);
  }

  desktopItems = getTestDesktopItems();
  lastResult!: Observable<any>;

  override addDesktopItem(desktopItem: DesktopItem): Observable<DesktopItem> {
    this.desktopItems.push(desktopItem);
    this.lastResult = of(this.desktopItems);
    return this.lastResult;
  }

  override deleteItem(id: any): Observable<DesktopItem> {
    throw new Error('Method not implemented.');
  }

  override getItems(): Observable<DesktopItem[]> {
    return this.lastResult = of(this.desktopItems);
  }

  override getItem(linkName: string | null): Observable<DesktopItem> {
    const item = this.desktopItems.find((el) => el.linkName === linkName);
    this.lastResult = of(item);
    return this.lastResult;
  }
}
