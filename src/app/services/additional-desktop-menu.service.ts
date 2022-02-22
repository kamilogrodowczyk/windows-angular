import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DesktopSavedOptions } from '../types/desktopMenu';

const SMALL = 'small';
const MEDIUM = 'medium';
const LARGE = 'large';

@Injectable({
  providedIn: 'root',
})
export class AdditionalDesktopMenuService {
  private sizeState: Subject<string> = new Subject<string>();
  private sortByState: Subject<string> = new Subject<string>();

  storageOptions!: DesktopSavedOptions;
  currentOption: string = 'Medium icons';
  sizeState$ = this.sizeState.asObservable();

  constructor() {}

  setIconSize(option: string) {
    switch (option) {
      case 'Large icons':
        this.storageOptions = { ...this.storageOptions, size: LARGE };
        this.sizeState.next(LARGE);
        break;
      case 'Medium icons':
        this.storageOptions = { ...this.storageOptions, size: MEDIUM };
        this.sizeState.next(MEDIUM);
        break;
      case 'Small icons':
        this.storageOptions = { ...this.storageOptions, size: SMALL };
        this.sizeState.next(SMALL);
        break;
      default:
        break;
    }
    localStorage.setItem('options', JSON.stringify(this.storageOptions));
  }

  setViewState(iconsSize: string[], sizeOption: string) {
    if (!sizeOption) return;
    const storage = JSON.parse(sizeOption);
    const currentSize = iconsSize.filter((size) =>
      size.toLowerCase().includes(storage['size'])
    );
    this.currentOption = currentSize[0];
  }

  setIconSort(option: string) {
    this.sizeState.next(option);
  }
}
