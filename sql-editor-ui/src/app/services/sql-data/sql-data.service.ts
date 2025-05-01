import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SqlDataService {
  private apiUrl = 'https://localhost:44325/api';

  constructor(private http: HttpClient) {}

  getTables(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/SqlMeta/tables`);
  }

  getColumns(tableName: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiUrl}/SqlMeta/columns/${tableName}`
    );
  }
}
