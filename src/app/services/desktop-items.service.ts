import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DesktopItemCustom } from '../types/desktopItems';

@Injectable({
  providedIn: 'root',
})
export class DesktopItemsService {
  private iconsUrl = 'http://localhost:5000/customMenuItems';

  constructor(private http: HttpClient) {}

  getCustomItems(): Observable<DesktopItemCustom[]> {
    return this.http.get<DesktopItemCustom[]>(this.iconsUrl);
  }
}
