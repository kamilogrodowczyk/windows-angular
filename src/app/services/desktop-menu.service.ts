import { Injectable } from '@angular/core';
import { desktopMenu } from '../mocks/desktopMenu';

@Injectable({
  providedIn: 'root',
})
export class DesktopMenuService {
  menuItems: string[] = [];

  getItems(index: number) {
    this.menuItems = desktopMenu[index].name;
  }

  constructor() {}
}
