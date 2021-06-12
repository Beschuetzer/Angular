import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] LOGIN_START';
export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE';
export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE_FAIL';
export const LOGOUT = '[Auth] LOGOUT';
export const SIGN_UP = '[Auth] SIGN_UP';
export const SIGN_UP_START = '[Auth] SIGN_UP_START';

export type AuthInfo = {
  email: string;
  password: string;
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: AuthInfo) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string){}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;
  constructor(public payload: AuthInfo) {}
}

export type AuthActions = AuthenticateSuccess | Logout | LoginStart | AuthenticateFail | SignUpStart;
