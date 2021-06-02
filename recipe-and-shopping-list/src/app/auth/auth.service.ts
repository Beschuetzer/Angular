import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  AuthLoginResponseData,
  AuthSignUpResponseData,
} from '../models/auth-response.model';
import { User } from '../models/user.model';
import { plainToClass } from 'class-transformer';
import { DataStorageService } from '../shared/data-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new BehaviorSubject<User>(null);
  key = environment.firebaseApiKey;
  baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
  signUpUrl = `${this.baseUrl}:signUp?key=${this.key}`;
  loginUrl = `${this.baseUrl}:signInWithPassword?key=${this.key}`;
  tokenExpirationTimer: any;

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

  autoLogin() {
    const userDataFromLocalStorage: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userDataFromLocalStorage) return false;

    const instantiatedUser = new User(
      userDataFromLocalStorage.email,
      userDataFromLocalStorage.id,
      userDataFromLocalStorage._token,
      new Date(userDataFromLocalStorage._tokenExpirationDate),
    )

    if (instantiatedUser.token) {
      this.userSubject.next(instantiatedUser);
      const expirationDuration = new Date(userDataFromLocalStorage._tokenExpirationDate).getTime() - Date.now();
      this.autoLogout(+expirationDuration);
      return true;
    }

    return false;
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
    this.handleLogout();
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      

    }, expirationDuration)
  }

  private handleLogout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDuration = +expiresIn * 1000;
    const expirationDate = new Date(
      Date.now() + expirationDuration
    );
    
    const newUser = new User(
      email,
      userId,
      token,
      expirationDate
    );

    this.userSubject.next(newUser);
    localStorage.setItem('userData', JSON.stringify(newUser));
    this.autoLogout(expirationDuration);
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
