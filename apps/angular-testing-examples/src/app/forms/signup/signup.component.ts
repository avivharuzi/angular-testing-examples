import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { map, Observable, switchMap, timer } from 'rxjs';

import { SignupService } from './signup.service';

@Component({
  selector: 'ate-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  form = this.formBuilder.group({
    plan: ['personal', Validators.required],
    email: [
      null,
      [Validators.required, Validators.email],
      (control: AbstractControl) => this.validateEmail(control.value),
    ],
    password: [null, Validators.required],
    address: this.formBuilder.group({
      name: [null, Validators.required],
      country: [null, Validators.required],
    }),
    termsAndServices: [null, Validators.required],
  });

  submitStatus: 'success' | 'error' | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly signupService: SignupService
  ) {}

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.signupService.signup(this.form.value).subscribe((response) => {
      this.submitStatus = response.success ? 'success' : 'error';
    });
  }

  private validateEmail(username: string): Observable<ValidationErrors> {
    return timer(1000).pipe(
      switchMap(() => this.signupService.isEmailTaken(username)),
      map((emailTaken) => (emailTaken ? { taken: true } : {}))
    );
  }
}
