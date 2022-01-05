import { faDesktop, faDumpster, faFolder } from '@fortawesome/free-solid-svg-icons';
import { desktopItem } from '../types/desktopItems';

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

export const DesktopItemsCustom: desktopItem[] = [
  {
    icon: faFolder,
    name: 'Folder 1',
  },
  {
    icon: faFolder,
    name: 'Folder 2',
  },
];
