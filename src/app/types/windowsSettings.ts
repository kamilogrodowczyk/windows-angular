import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface SettingOptions {
  icon: IconProp;
  name: string;
}

export interface WindowsSettings {
  icon: IconProp;
  name: string;
  linkName: string;
  text?: string;
  elements?: SettingOptions[];
}
