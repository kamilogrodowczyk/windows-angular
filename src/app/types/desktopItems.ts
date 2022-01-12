import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface DesktopItem {
  id?: number;
  icon: IconProp;
  name: string;
  linkName: string;
  elements: any[];
}

export interface DesktopItemElement {
  icon: IconProp;
  name: string;
  linkName: string;
  content: string;
  type: string;
  characters: number;
}
