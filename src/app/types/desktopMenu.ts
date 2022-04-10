export interface DesktopMenu {
  name: string[];
  anchor: boolean[];
  [propName: string]: any;
}

export interface DesktopSavedOptions {
  size: string;
  sortBy: string;
  nightDisplay: boolean;
  nightDisplayValue: number;
  colorAccent: string,
  isTransparent: boolean,
  theme: string,
  background: string,
  backgroundFit: string,
}
