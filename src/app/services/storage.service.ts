import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { DesktopSavedOptions } from '../types/desktopMenu';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  private storageSubject = new Subject<any>();
  storageOptions!: DesktopSavedOptions;

  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  get(key: string) {
    return this.storage.getItem(key);
  }

  set(
    key: string,
    value: Partial<DesktopSavedOptions>,
    isSubject: boolean = false
  ) {
    const optionsJson = this.get(key) || '{}';
    this.storageOptions =
      optionsJson !== null
        ? { ...JSON.parse(optionsJson), ...value }
        : { ...value };
    this.storage.setItem(key, JSON.stringify(this.storageOptions));
    if (isSubject) {
      this.storageSubject.next({ ...value });
    }
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  getStorageSubject(): Observable<any> {
    return this.storageSubject.asObservable();
  }
}
