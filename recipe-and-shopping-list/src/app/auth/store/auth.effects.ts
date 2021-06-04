import { HttpClient } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { AuthLoginResponseData } from 'src/app/models/auth-response.model';
import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';

const KEY = environment.firebaseApiKey;
const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const SIGN_UP_URL = `${BASE_URL}:signUp?key=${KEY}`;
const LOGIN_URL = `${BASE_URL}:signInWithPassword?key=${KEY}`;


export class AuthEffects {
  authLogin = createEffect(() => {
    return this.actions.pipe(
      //ofType allows you to specify which actions trigger this effect (separate actions by a comma if multiple)
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http.post<AuthLoginResponseData>(LOGIN_URL), {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        }
      }),
       
    )
  }) 

  constructor (
    //actions$ is a stream of actions
    private actions: Actions,
    private http: HttpClient,
  ){}
}