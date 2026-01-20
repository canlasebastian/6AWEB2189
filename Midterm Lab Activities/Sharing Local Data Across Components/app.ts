import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { Products } from './products';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angular-share-data');

public employees: {
  id: number,
  firstname: string,
  lastname: string,
  email: string
}[] = [];

constructor(
  private _employeeService: Employee,
  private _productService: Products
) {}

ngOnInit() {
  this.employees = this._employeeService.getEmployees();
  this.products = this._productService.getProducts();
}

public products: {
  productid: number,
  productname: string,
  description: string,
  price: number
}[] = [];
}

