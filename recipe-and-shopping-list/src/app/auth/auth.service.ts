import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  AuthSignUpResponseData,
} from '../models/auth-response.model';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}

  autoLogin() {
    const userDataFromLocalStorage: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userDataFromLocalStorage) return false;

    if (userDataFromLocalStorage._token) {
      this.store.dispatch(
        new AuthActions.AuthenticateSuccess({
          email: userDataFromLocalStorage.email,
          userId: userDataFromLocalStorage.id,
          token: userDataFromLocalStorage._token,
          expirationDate: new Date(
            userDataFromLocalStorage._tokenExpirationDate
          ),
        })
      );
      const expirationDuration =
        new Date(userDataFromLocalStorage._tokenExpirationDate).getTime() -
        Date.now();
      this.autoLogout(+expirationDuration);
      return true;
    }

    return false;
  }

  logout() {
    this.handleLogout();
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {}, expirationDuration);
  }

  private handleLogout() {
    this.store.dispatch(
      new AuthActions.Logout(),
    )
    this.router.navigate(['/auth']);
  }
  
}
