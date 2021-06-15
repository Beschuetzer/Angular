import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as AuthActions from './auth/store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private authService: AuthService,
    private store: Store,
  ) { }

  loginViaLocalStorage() { 
    if (localStorage.getItem('userData')) {
      const userDataFromLocalStorage: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userDataFromLocalStorage) return false;
  
      if (userDataFromLocalStorage._token) {
        const expirationDuration =
          new Date(userDataFromLocalStorage._tokenExpirationDate).getTime() -
          Date.now();

        this.authService.setLogoutTimer(expirationDuration);

        this.store.dispatch(new AuthActions.AuthenticateSuccess({
          email: userDataFromLocalStorage.email,
          userId: userDataFromLocalStorage.id,
          token: userDataFromLocalStorage._token,
          expirationDate: new Date(
            userDataFromLocalStorage._tokenExpirationDate
          ),
          redirect: false,
        }))
      }
    }
  }
}
