import { DesktopMenu as desktopMenuInterface } from '../types/desktopMenu';

export const desktopMenu: desktopMenuInterface[] = [
  {
    name: ['Open', 'Opróżnij kosz', 'Zmień nazwę'],
    anchor: [true, false, true],
  },
  {
    name: ['Open', 'Zmień nazwę'],
    anchor: [true, true],
  },
  {
    name: ['Open', 'Wytnij', 'Kopiuj', 'Usuń', 'Zmień nazwę'],
    anchor: [true, false, false, false, true],
  },
  {
    name: ['Widok', 'Sortuj według', 'Refresh', 'Nowy folder', 'Ustawienia ekranu', 'Personalizuj'],
    anchor: [true, false, false, true, true, true],
  },
];
