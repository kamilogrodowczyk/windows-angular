import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DesktopItem } from '../types/desktopItems';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DesktopItemsService {
  private iconsUrl: string = environment.apiUrl;

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

  getItems(): Observable<DesktopItem[]> {
    return this.http.get<DesktopItem[]>(this.iconsUrl);
  }

  getItem(linkName: string): Observable<DesktopItem[]> {
    return this.http
      .get<DesktopItem[]>(`${this.iconsUrl}/?linkName=${linkName}`)
      .pipe(catchError(this.handleError<DesktopItem[]>('getCustomItem', [])));
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
