import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DesktopItemCustom } from '../types/desktopItems';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DesktopItemsService {
  private iconsUrl = 'http://localhost:5000/customMenuItems';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${error.message}`);
      return of(result as T);
    };
  }

  getCustomItems(): Observable<DesktopItemCustom[]> {
    return this.http.get<DesktopItemCustom[]>(this.iconsUrl);
  }

  getCustomItem(linkName: string): Observable<DesktopItemCustom[]> {
    return this.http
      .get<DesktopItemCustom[]>(`${this.iconsUrl}/?linkName=${linkName}`)
      .pipe(
        catchError(this.handleError<DesktopItemCustom[]>('getCustomItem', []))
      );
  }

  updateItem(item: DesktopItemCustom): Observable<any> {
    return this.http
      .put(`${this.iconsUrl}/${item['id']}`, item, this.httpOptions)
      .pipe(catchError(this.handleError('updateItem')));
  }
}
