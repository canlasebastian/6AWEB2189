import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  form: FormGroup;
  skillLevel = signal(5);
  submitted = signal(false);
  submittedData = signal<any>(null);

  countries = ['Philippines', 'USA', 'Japan', 'Germany', 'Australia'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      gender: [''],
      address: [''],
      birthDate: ['', Validators.required],
      skillLevel: [5],
      country: [''],
      agreeTerms: [false],
    });
  }

  onSliderChange(value: number) {
    this.skillLevel.set(value);
  }

  onSubmit() {
    this.submitted.set(true);
    if (this.form.valid) {
      this.submittedData.set({ ...this.form.value });
      console.log(this.form.value);
    } else {
      this.submittedData.set(null);
    }
  }
}