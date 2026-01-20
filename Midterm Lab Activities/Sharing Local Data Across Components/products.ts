import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Products {
  getProducts() {
    return [
      { productid: 201, productname: 'Laptop', description: '15 inch, 16GB RAM', price: 1200 },
      { productid: 202, productname: 'Mouse', description: 'Wireless Optical', price: 25 },
      { productid: 203, productname: 'Keyboard', description: 'Mechanical', price: 80 },
      { productid: 204, productname: 'Monitor', description: '24 inch LED', price: 150 }
    ];
  }
}
