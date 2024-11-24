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

  addItem() {
    if (!this.name || !this.description) {
      this.errorMessage = 'Both name and description are required!';
      return;
    }

    // Prepare the data for the new item
    const newItem = { name: this.name, description: this.description };

    // Call the backend API to create a new item
    this.http.post<any>(`${this.apiUrl}/create.php`, newItem).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.successMessage = 'Item added successfully!';  // Success message
          this.name = '';  // Clear the name input
          this.description = '';  // Clear the description input
        } else {
          this.errorMessage = 'Error adding item. Please try again!';  // Error message
        }
      },
      (error) => {
        this.errorMessage = 'Error adding item. Please try again!';  // Error message if the API call fails
      }
    );
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
