import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  AuthLoginResponseData,
  AuthSignUpResponseData,
} from 'src/app/models/auth-response.model';
import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

const KEY = environment.firebaseApiKey;
const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const SIGN_UP_URL = `${BASE_URL}:signUp?key=${KEY}`;
const LOGIN_URL = `${BASE_URL}:signInWithPassword?key=${KEY}`;

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string,
  authService: AuthService,
) => {
  authService.setLogoutTimer(+expiresIn * 1000)


  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const newUser = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(newUser));

  return new AuthActions.AuthenticateSuccess({
    email,
    userId,
    token,
    expirationDate,
    redirect: true,
  });
};

const handleError = (errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An unknown error occurred';
  let defaultMessage = 'Connectivity Issues...';

  switch (errorResponse.error?.error?.message) {
    case 'EMAIL_NOT_FOUND':
      errorMessage = `An account with that email was not found. Try again`;
      break;
    case 'INVALID_PASSWORD':
      errorMessage = `Invalid password entered.  Try again.`;
      break;
    case 'USER_DISABLED':
      errorMessage = `The account that email has been disabled by the admin. Try contacting the admin to see why this had happened.`;
      break;
    case 'EMAIL_EXISTS':
      errorMessage = `An account with that email already exists. Try logging in instead`;
      break;
    default:
      errorMessage = defaultMessage;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    //actions$ is a stream of actions
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
  ) {}
 
  @Effect({dispatch: false})
  authLogout$ = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  )

  @Effect()
  autoLogin$ = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
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

        return new AuthActions.AuthenticateSuccess({
          email: userDataFromLocalStorage.email,
          userId: userDataFromLocalStorage.id,
          token: userDataFromLocalStorage._token,
          expirationDate: new Date(
            userDataFromLocalStorage._tokenExpirationDate
          ),
          redirect: true,
        })
      }
      return { type: "DUMMY"}
    })
  )

  @Effect()
  authSignUp$ = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap((signUpAction: AuthActions.SignUpStart) => {
      return this.http
        .post<AuthSignUpResponseData>(SIGN_UP_URL, {
          email: signUpAction.payload.email,
          password: signUpAction.payload.password,
          returnSecureToken: true,
        })
        .pipe(
          map((resData) => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.idToken,
              resData.localId,
              this.authService,
            );
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return handleError(errorResponse);
          })
        );
    })
  );

  @Effect()
  authLoginStart$ = this.actions$.pipe(
    //ofType allows you to specify which actions trigger this effect (separate actions by a comma if multiple)
    ofType(AuthActions.LOGIN_START),
    tap(() => {console.log('starting login------------------------------------------------')}),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthLoginResponseData>(LOGIN_URL, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        })
        .pipe(
          map((resData) => {
            ;
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.idToken,
              resData.localId,
              this.authService,
            );
          }),
          //Note: have to handle errors for effects differently than in services, namely by piping and catching error on the innermost observable
          catchError((errorResponse: HttpErrorResponse) => {
            //Have to return a non-error Observable, otherwise the upper-level Observable 'dies'
            //of is an operator that does such a thing
            //just need to add an action object inside of 'of()'; ngrx auto dispatches it
            return handleError(errorResponse);
          })
        );
    })
  );

  //add {dispatch: false} if no action is returned
  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessActions: AuthActions.AuthenticateSuccess) => {
      console.log('re-routing------------------------------------------------');
      if (authSuccessActions.payload.redirect === true) this.router.navigate(['/']);
      this.dataStorageService.fetchRecipes().subscribe(data => {});
    })
  );

}
