import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'booksapp';

  readonly APIUrl = "http://localhost:5038/api/books/";

  books: any[] = [];

  constructor(private http: HttpClient) {}

  refreshBooks() {
    this.http.get(this.APIUrl + 'GetBooks').subscribe(data => {
      this.books = data as any[];
    });
  }

  ngOnInit() {
    this.refreshBooks();
  }

  addBook() {
    const newBook = (<HTMLInputElement>document.getElementById("newBook")).value.trim();
    const newDesc = (<HTMLInputElement>document.getElementById("newDesc")).value.trim();
    const newPrice = (<HTMLInputElement>document.getElementById("newPrice")).value.trim();
    const newAuthor = (<HTMLInputElement>document.getElementById("newAuthor")).value.trim();
    const newGenre = (<HTMLInputElement>document.getElementById("newGenre")).value.trim();

    const formData = new FormData();
    formData.append("title", newBook);
    formData.append("description", newDesc);
    formData.append("price", newPrice);
    formData.append("author", newAuthor);
    formData.append("genre", newGenre);

    this.http.post(this.APIUrl + 'AddBook', formData).subscribe(data => {
      alert(data);
      this.refreshBooks();

      (<HTMLInputElement>document.getElementById("newBook")).value = '';
      (<HTMLInputElement>document.getElementById("newDesc")).value = '';
      (<HTMLInputElement>document.getElementById("newPrice")).value = '';
      (<HTMLInputElement>document.getElementById("newAuthor")).value = '';
      (<HTMLInputElement>document.getElementById("newGenre")).value = '';
    });
  }

  deleteBook(id: any) {
    this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe(data => {
      alert(data);
      this.refreshBooks();
    });
  }
}
