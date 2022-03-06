import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DesktopSavedOptions } from '../types/desktopMenu';
import { BrowserStorageService } from '../services/storage.service';

const SMALL = 'small';
const MEDIUM = 'medium';
const LARGE = 'large';

@Injectable({
  providedIn: 'root',
})
export class AdditionalDesktopMenuService {
  private sizeState: Subject<string> = new Subject<string>();

  storageSize!: Partial<DesktopSavedOptions>;
  currentOption: string = 'Medium icons';
  sizeState$ = this.sizeState.asObservable();

  constructor(private storage: BrowserStorageService) {}

  setIconSize(option: string) {
    switch (option) {
      case 'Large icons':
        this.storage.set('options', { size: LARGE });
        this.sizeState.next(LARGE);
        break;
      case 'Medium icons':
        this.storage.set('options', { size: MEDIUM });
        this.sizeState.next(MEDIUM);
        break;
      case 'Small icons':
        this.storage.set('options', { size: SMALL });
        this.sizeState.next(SMALL);
        break;
      default:
        break;
    }
  }
}
