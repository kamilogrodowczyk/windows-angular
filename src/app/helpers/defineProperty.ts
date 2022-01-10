import { DesktopMenu } from "../types/desktopMenu";

export function defineProperty<T>(obj: T[]): void {
  obj.forEach((desktopItem: any) => {
    Object.defineProperty(desktopItem, 'linkName', {
      get: function (): string {
        return this.name.replace(/\s/g, '').toLowerCase();
      },
    });
  });
}

export function definePropertyArray<T extends DesktopMenu>(obj: T[]) {
  obj.forEach((menu, index) => {
    Object.defineProperty(obj[index], 'linkName', {
      get: function () {
        return menu.name.map((n) => n.replace(/\s/g, '').toLowerCase());
      },
    });
  });
}
