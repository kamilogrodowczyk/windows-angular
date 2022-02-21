import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const SMALL = 'small';
const MEDIUM = 'medium';
const LARGE = 'large';

@Injectable({
  providedIn: 'root',
})
export class AdditionalDesktopMenuService {
  private sizeState: Subject<string> = new Subject<string>();
  private sortByState: Subject<string> = new Subject<string>();

  sizeState$ = this.sizeState.asObservable();

  constructor() {}

  setIconSize(option: string) {
    switch (option) {
      case 'Large icons':
        localStorage.setItem('option', LARGE);
        this.sizeState.next(LARGE);
        break;
      case 'Medium icons':
        localStorage.setItem('option', MEDIUM);
        this.sizeState.next(MEDIUM);
        break;
      case 'Small icons':
        localStorage.setItem('option', SMALL);
        this.sizeState.next(SMALL);
        break;
      default:
        break;
    }
  }

  setIconSort(option: string) {
    this.sizeState.next(option);
  }
}
