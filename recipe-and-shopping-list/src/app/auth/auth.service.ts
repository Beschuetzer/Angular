import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  AuthLoginResponseData,
  AuthSignUpResponseData,
} from '../models/auth-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new BehaviorSubject<User>(null);
  key = 'AIzaSyBEoUzSKmpOWxeVbfH09xe7kK7XCuLVmj8';
  baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
  signUpUrl = `${this.baseUrl}:signUp?key=${this.key}`;
  loginUrl = `${this.baseUrl}:signInWithPassword?key=${this.key}`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signUp(email: string, password: string) {
    if (!email || !password)
      throw new Error('Invalid Email and/or password in AuthService.signUp()');

    const body = {
      email,
      password,
      returnSecureToken: true,
    };

    return this.http.post<AuthSignUpResponseData>(this.signUpUrl, body).pipe(
      catchError((errorResponse) => {
        return this.handleError(email, errorResponse);
      }),
      tap((response) => {
        this.handleAuthentication(email, response.idToken, response.localId, +response.expiresIn)
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
      }),
      tap((response) => {
        this.handleAuthentication(email, response.idToken, response.localId, +response.expiresIn)
      })
    );
  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      Date.now() + +expiresIn * 1000
    );
    
    const newUser = new User(
      email,
      userId,
      token,
      expirationDate
    );

    this.userSubject.next(newUser);
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
