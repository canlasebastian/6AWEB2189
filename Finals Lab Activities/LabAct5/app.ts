import { Component, signal } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe,
    TitleCasePipe,
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
    MatSlideToggleModule,
    MatStepperModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  form: FormGroup;
  submitted = signal(false);
  submittedData = signal<any>(null);
  isDarkMode = signal(false);
  showPassword = signal(false);
  passwordStrength = signal(0);

  maxBirthDate = new Date(2006, 11, 31); // Dec 31, 2006

  eventTypes = [
    'Tech Conference',
    'Workshop / Bootcamp',
    'Hackathon',
    'Webinar / Online Talk',
    'Meetup / Networking',
    'Career Fair'
  ];

  dietaryOptions = ['No Preference', 'Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free'];

  tshirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      // Personal Info
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      gender: [''],
      birthDate: ['', [Validators.required, this.birthDateValidator.bind(this)]],
      phone: [''],

      // Event Preferences
      eventType: ['', Validators.required],
      dietary: ['No Preference'],
      tshirtSize: ['M'],
      experienceLevel: [3],

      // Additional
      organization: [''],
      jobTitle: [''],
      specialRequirements: [''],
      agreeTerms: [false, Validators.requiredTrue],
      receiveUpdates: [false],
    });

    // Watch password changes for strength meter
    this.form.get('password')?.valueChanges.subscribe(val => {
      this.passwordStrength.set(this.calculatePasswordStrength(val || ''));
    });
  }

  /** Custom validator: alphanumeric, at least 8 chars, starts with letter */
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    if (value.length < 8) {
      return { minlength: true };
    }

    if (!/^[a-zA-Z]/.test(value)) {
      return { startsWithLetter: true };
    }

    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return { alphanumeric: true };
    }

    return null;
  }

  /** Custom validator: birth date must be year 2006 or earlier */
  birthDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const date = new Date(value);
    if (date.getFullYear() > 2006) {
      return { tooYoung: true };
    }
    if (date.getFullYear() === 2006 && date > this.maxBirthDate) {
      return { tooYoung: true };
    }

    return null;
  }

  calculatePasswordStrength(password: string): number {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 25;
    return Math.min(100, strength);
  }

  getPasswordStrengthLabel(): string {
    const s = this.passwordStrength();
    if (s === 0) return '';
    if (s < 30) return 'Weak';
    if (s < 60) return 'Fair';
    if (s < 80) return 'Good';
    return 'Strong';
  }

  getPasswordStrengthColor(): string {
    const s = this.passwordStrength();
    if (s < 30) return 'warn';
    if (s < 60) return 'accent';
    return 'primary';
  }

  toggleDarkMode() {
    this.isDarkMode.update(v => !v);
    document.documentElement.classList.toggle('dark-theme', this.isDarkMode());
  }

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  onSubmit() {
    this.submitted.set(true);
    if (this.form.valid) {
      this.submittedData.set({ ...this.form.value });
      this.snackBar.open('🎉 Registration submitted successfully!', 'Close', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.submittedData.set(null);
      this.form.markAllAsTouched();
      this.snackBar.open('⚠️ Please fix the errors before submitting.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  onReset() {
    this.form.reset({
      dietary: 'No Preference',
      tshirtSize: 'M',
      experienceLevel: 3,
      agreeTerms: false,
      receiveUpdates: false,
    });
    this.submitted.set(false);
    this.submittedData.set(null);
  }

  getExperienceLabel(): string {
    const level = this.form.get('experienceLevel')?.value || 1;
    const labels = ['', 'Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];
    return labels[level] || '';
  }
}