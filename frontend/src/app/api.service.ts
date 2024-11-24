import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000'; // The backend URL

  constructor(private http: HttpClient) {}

  // Get all items
  getItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api.php`);
  }

  // Create a new item
  createItem(name: string, description: string): Observable<any> {
    const data = { name, description };
    return this.http.post<any>(`${this.apiUrl}/create.php`, data);
  }

  // Update an item
  updateItem(id: number, name: string, description: string): Observable<any> {
    const data = { id, name, description };
    return this.http.put<any>(`${this.apiUrl}/update.php`, data);
  }

  // Delete an item
  deleteItem(id: number): Observable<any> {
    // Pass the id as a query parameter
    return this.http.delete<any>(`${this.apiUrl}/delete.php?id=${id}`);
  }

}
