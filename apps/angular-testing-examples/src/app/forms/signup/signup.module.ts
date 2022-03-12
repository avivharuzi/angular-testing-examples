import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { SignupService } from './signup.service';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [SignupService],
})
export class SignupModule {}
