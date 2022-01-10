import {
  faDesktop,
  faDumpster,
} from '@fortawesome/free-solid-svg-icons';
import { desktopItem } from '../types/desktopItems';
import { defineProperty } from '../helpers/defineProperty';

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

defineProperty<desktopItem>(DesktopItems);
