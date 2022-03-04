import { Inject, Injectable, InjectionToken } from '@angular/core';
import { DesktopSavedOptions } from '../types/desktopMenu';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  storageOptions!: DesktopSavedOptions;
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  get(key: string) {
    return this.storage.getItem(key);
  }

  set(key: string, value: Partial<DesktopSavedOptions>) {
    const optionsJson = this.get('options') || '{}';
    this.storageOptions =
      optionsJson !== null
        ? { ...JSON.parse(optionsJson), ...value }
        : { ...value };
    this.storage.setItem(key, JSON.stringify(this.storageOptions));
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
