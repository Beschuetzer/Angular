import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  AuthLoginResponseData,
  AuthSignUpResponseData,
} from '../models/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  key = 'AIzaSyBEoUzSKmpOWxeVbfH09xe7kK7XCuLVmj8';
  baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
  signUpUrl = `${this.baseUrl}:signUp?key=${this.key}`;
  loginUrl = `${this.baseUrl}:signInWithPassword?key=${this.key}`;

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    if (!email || !password)
      throw new Error('Invalid Email and/or password in AuthService.signUp()');

    console.log('email =', email);
    console.log('password =', password);
    const body = {
      email,
      password,
      returnSecureToken: true,
    };

    return this.http.post<AuthSignUpResponseData>(this.signUpUrl, body).pipe(
      catchError((errorResponse) => {
       return this.handleError(email, errorResponse);
      })
    );
  }

  login(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true,
    };

    return this.http.post<AuthLoginResponseData>(this.loginUrl, body).pipe(
      catchError((errorResponse) => {
        return this.handleError(email, errorResponse);
      })
    );
  }

  private handleError(email, errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    let defaultMessage = 'Connectivity Issues...';

    switch (errorResponse.error?.error?.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = `An account with the email '${email}' was not found. Try creating one instead.`;
        break;
      case 'INVALID_PASSWORD':
        errorMessage = `Invalid password entered.  Try again.`;
        break;
      case 'USER_DISABLED':
        errorMessage = `The account the email '${email}' has been disabled by the admin. Try contacting the admin to see why this had happened.`;
        break;
      case 'EMAIL_EXISTS':
        errorMessage = `An account with the email '${email}' already exists. Try logging in instead`;
        break;
      default:
        errorMessage = defaultMessage;
    }
    return throwError(errorMessage);
  }
}
