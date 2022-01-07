import { faDesktop, faDumpster, faFolder } from '@fortawesome/free-solid-svg-icons';
import { desktopItem, DesktopItemCustom } from '../types/desktopItems';

export const DesktopItems: desktopItem[] = [
  {
    icon: faDumpster,
    name: 'Recycle Bin',
  },
  {
    icon: faDesktop,
    name: 'This PC',
  },
];
