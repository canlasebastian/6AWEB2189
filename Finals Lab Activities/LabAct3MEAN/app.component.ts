import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'booksapp';
  readonly APIUrl = "http://localhost:5038/api/books/";

  books: any[] = [];
  editingBook: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshBooks();
  }

  refreshBooks() {
    this.http.get(this.APIUrl + 'GetBooks').subscribe(data => {
      this.books = data as any[];
    });
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

  startEdit(book: any) {
    this.editingBook = { ...book };
  }

  cancelEdit() {
    this.editingBook = null;
  }

  saveEdit() {
    const formData = new FormData();
    formData.append("title", this.editingBook.title);
    formData.append("description", this.editingBook.desc);
    formData.append("price", this.editingBook.price);
    formData.append("author", this.editingBook.author);
    formData.append("genre", this.editingBook.genre);

    this.http.put(this.APIUrl + 'UpdateBook?id=' + this.editingBook.id, formData).subscribe(data => {
      alert(data);
      this.editingBook = null;
      this.refreshBooks();
    });
  }

  deleteBook(id: any) {
    this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe(data => {
      alert(data);
      this.refreshBooks();
    });
  }
}
