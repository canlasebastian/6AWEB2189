import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, KeyValuePipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pipes-demo',
  imports: [DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, SlicePipe, AsyncPipe, DecimalPipe, PercentPipe, TitleCasePipe, KeyValuePipe, CommonModule],
  templateUrl: './pipes-demo.html',
  styleUrl: './pipes-demo.css',
})

export class PipesDemo {
  presentDate = new Date();
  price = 2000;
  time$ = interval(1000).pipe(map(val => new Date()))
  Fruits = ["Apple", "Orange", "Grapes", "Mango", "Kiwi", "Pomegranate"];

  decimalNum1: number = 8.7589623;
  decimalNum2: number = 5.43;

  percentValue = 0.126;

  titleText = 'angular pipes demo';

  student = {
    name: 'Sevi',
    age: 21,
    course: 'Angular'
  };

}

