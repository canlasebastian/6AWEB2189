import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NgIf, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-template-demo',
  imports: [FormsModule, NgIf, JsonPipe],
  templateUrl: './template-demo.component.html',
  styleUrl: './template-demo.component.css'
})
export class TemplateDemoComponent {
title = 'Template Driven Demo';
username ='';
email = '';
password = '';
role = '';
gender = '';
status = '';
comments = '';
submitted = false;

onSubmit() {
  this. submitted = true;
}
}
