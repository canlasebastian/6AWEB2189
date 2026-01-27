import { Component, signal, OnInit } from '@angular/core';
import { User } from './user.model';
import { Httpclient } from './httpclient';

import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']  // <-- correct property name
})
export class App implements OnInit {
  protected readonly title = signal('http-client-demo');

  httpusers: User[] = [];
  products: Product[] = [];

  constructor(
    private httpClient: Httpclient,
    private productService: ProductService
  ) {}

  loadProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.products.slice(0, 5); // LIMIT TO 5
    });
  }

  ngOnInit(): void {
    // Load users
    this.httpClient.getUsersRemotely().subscribe((data: User[]) => {
      this.httpusers = data;
    });

    // Load products
    this.loadProducts();
  }
}
