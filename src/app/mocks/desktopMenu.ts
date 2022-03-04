import { definePropertyArray } from '../helpers/defineProperty';
import { DesktopMenu as desktopMenuInterface } from '../types/desktopMenu';

export const desktopMenu: desktopMenuInterface[] = [
  {
    name: ['Open', 'Empty Recycle Bin', 'Change name'],
    anchor: [true, false, true],
  },
  {
    name: ['Open', 'Change name'],
    anchor: [true, true],
  },
  {
    name: ['Open', 'Copy', 'Remove', 'Change name'],
    anchor: [true, false, false, false, true],
  },
  {
    name: [
      'View',
      'Sort by',
      'Refresh',
      'Paste',
      'New folder',
      'Ustawienia ekranu',
      'Personalizuj',
    ],
    anchor: [true, false, false, true, true, true],
  },
];

export const viewMenu: string[] = ['Large icons', 'Medium icons', 'Small icons']
export const sortByMenu: string[] = ['Name', 'Id']

definePropertyArray(desktopMenu);
