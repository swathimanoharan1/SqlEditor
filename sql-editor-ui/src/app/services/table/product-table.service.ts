import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductTableService {
  private apiUrl = 'https://localhost:44325/api';

  constructor(private http: HttpClient) {}

  getColumns(tableName: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiUrl}/Products/columns/${tableName}`
    );
  }
}
