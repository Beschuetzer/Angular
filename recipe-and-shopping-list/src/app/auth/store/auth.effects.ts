import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
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

const KEY = environment.firebaseApiKey;
const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const SIGN_UP_URL = `${BASE_URL}:signUp?key=${KEY}`;
const LOGIN_URL = `${BASE_URL}:signInWithPassword?key=${KEY}`;

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  return new AuthActions.AuthenticateSuccess({
    email,
    userId,
    token,
    expirationDate,
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
              resData.localId
            );
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return handleError(errorResponse);
          })
        );
    })
  );

  @Effect()
  authLogin$ = this.actions$.pipe(
    //ofType allows you to specify which actions trigger this effect (separate actions by a comma if multiple)
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthLoginResponseData>(LOGIN_URL, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        })
        .pipe(
          map((resData) => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.idToken,
              resData.localId
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

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(
    //actions$ is a stream of actions
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
