import { definePropertyArray } from '../helpers/defineProperty';
import { DesktopMenu as desktopMenuInterface } from '../types/desktopMenu';

export const desktopMenu: desktopMenuInterface[] = [
  {
    name: ['Open', 'Opróżnij kosz', 'Change name'],
    anchor: [true, false, true],
  },
  {
    name: ['Open', 'Change name'],
    anchor: [true, true],
  },
  {
    name: ['Open', 'Wytnij', 'Kopiuj', 'Usuń', 'Change name'],
    anchor: [true, false, false, false, true],
  },
  {
    name: [
      'Widok',
      'Sortuj według',
      'Refresh',
      'Nowy folder',
      'Ustawienia ekranu',
      'Personalizuj',
    ],
    anchor: [true, false, false, true, true, true],
  },
];

definePropertyArray(desktopMenu);
