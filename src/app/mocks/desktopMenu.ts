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
    anchor: [true, false, false, true],
  },
  {
    name: [
      'View',
      'Sort by',
      'Refresh',
      'Paste',
      'New folder',
      'Display settings'
      // 'New text document',
      // 'Personalize',
    ],
    anchor: [false, false, false, false, true, true, true],
  },
  {
    name: ['New text document'],
    anchor: [false],
  },
  {
    name: ['Open', 'Remove document'],
    anchor: [true],
  },
];

export const viewMenu: string[] = ['Large icons', 'Medium icons', 'Small icons']
export const sortByMenu: string[] = ['Name', 'Creation date']

definePropertyArray(desktopMenu);
