import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { IsEmailTakenResponse, Signup, SignupResponse } from './signup';

export class SignupService {
  constructor(private readonly httpClient: HttpClient) {}

  isEmailTaken(email: string): Observable<boolean> {
    return this.httpClient
      .post<IsEmailTakenResponse>('/email-taken', { email })
      .pipe(map((response) => response.isEmailTaken));
  }

  signup(signup: Signup): Observable<SignupResponse> {
    return this.httpClient.post<SignupResponse>('/signup', signup);
  }
}
