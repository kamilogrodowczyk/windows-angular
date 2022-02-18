import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, share } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { DesktopItem } from '../types/desktopItems';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DesktopItemsService {
  readonly iconsUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);

      if (error.error instanceof Event) {
        throw error.error;
      }

      const message = `server returned code ${error.status} with body "${error.error}"`;
      throw new Error(`${operation} failed: ${message}`);
    };
  }

  getItems(): Observable<DesktopItem[]> {
    return this.http
      .get<DesktopItem[]>(this.iconsUrl)
      .pipe(catchError(this.handleError<DesktopItem[]>('getItems')));
  }

  getItem(linkName: string): Observable<DesktopItem> {
    return this.http
      .get<DesktopItem[]>(`${this.iconsUrl}/?linkName=${linkName}`)
      .pipe(
        map((items) => items[0]),
        catchError(this.handleError<DesktopItem>('getItem'))
      );
  }

  addDesktopItem(desktopItem: DesktopItem): Observable<DesktopItem> {
    return this.http
      .post<DesktopItem>(this.iconsUrl, desktopItem, this.httpOptions)
      .pipe(catchError(this.handleError<DesktopItem>('addDesktopItem')));
  }

  updateItem(item: DesktopItem): Observable<any> {
    return this.http
      .put(`${this.iconsUrl}/${item['id']}`, item, this.httpOptions)
      .pipe(catchError(this.handleError('updateItem')));
  }

  deleteItem(id: any): Observable<DesktopItem> {
    return this.http
      .delete<DesktopItem>(`${this.iconsUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError<DesktopItem>('deleteItem')));
  }
}
