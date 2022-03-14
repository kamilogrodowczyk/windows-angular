import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private appElementName = new Subject<string>();
  private documentElement = new Subject<string>();

  appElement$ = this.appElementName.asObservable();
  documentElement$ = this.documentElement.asObservable();

  constructor() {}

  getAppElementName(name: string, documentName: string = ''): void {
    this.appElementName.next(name);
    if(!documentName) return;
    this.documentElement.next(documentName);
  }
}
