import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';  // To use HttpClient and HttpParams

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items = [];
  name = '';
  description = '';
  updateId = 0;
  updateName = '';
  updateDescription = '';
  apiUrl: string = 'http://localhost:8000';  // Define your API URL
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.apiService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  addItem(): void {
    this.apiService.createItem(this.name, this.description).subscribe(() => {
      this.getItems();  // Reload the items after adding
    });
  }

  updateItem(): void {
    this.apiService.updateItem(this.updateId, this.updateName, this.updateDescription).subscribe(() => {
      this.getItems();  // Reload the items after updating
    });
  }

  deleteItem(id: number) {
    const params = new HttpParams().set('id', id.toString());

    this.http.delete<any>(`${this.apiUrl}/delete.php`, { params }).subscribe(
      (response) => {
        if (response.status === 'success') {
          // Remove the deleted item from the local list
          this.items = this.items.filter(item => item.id !== id);
          this.successMessage = 'Item deleted successfully!';
        } else {
          this.errorMessage = 'Error deleting item. Please try again.';
        }
      },
      (error) => {
        this.errorMessage = 'Error deleting item. Please try again.';
      }
    );
  }

}
