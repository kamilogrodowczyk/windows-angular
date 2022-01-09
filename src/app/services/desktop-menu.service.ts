import { Injectable } from '@angular/core';
import { desktopMenu } from '../mocks/desktopMenu';
import { DesktopMenu } from '../types/desktopMenu';

@Injectable({
  providedIn: 'root',
})
export class DesktopMenuService {
  menuItems: string[] = [];
  anchorItems: boolean[] = [];

  getItems(index: number) {
    this.menuItems = desktopMenu[index].name;
    this.anchorItems = desktopMenu[index].anchor;
  }

  clearItems() {
    this.menuItems = [];
  }

  refresh() {
    window.location.reload();
  }

  changeName(text: string) {
    return text.replace(/\s/g, '').toLowerCase();
  }

  constructor() {}
}
