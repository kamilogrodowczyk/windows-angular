import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface desktopItem {
  icon: IconDefinition;
  name: string;
  [propName: string]: any;
}

export interface DesktopItemCustom {
  name: string;
  [propName: string]: any;
}
