import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private appElementName = new Subject<string>();

  appElement$ = this.appElementName.asObservable();

  constructor() {}

  getAppElementName(name: string): void {
    this.appElementName.next(name);
  }
}
