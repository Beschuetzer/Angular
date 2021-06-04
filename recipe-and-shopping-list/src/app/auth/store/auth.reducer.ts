import { User } from 'src/app/models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean,
}

const INITIAL_STATE: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = INITIAL_STATE,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        user: new User(
          action.payload.email,
          action.payload.userId,
          action.payload.token,
          action.payload.expirationDate,
        ),
        authError: null,
        loading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: INITIAL_STATE.user,
        loading: false,
      }
    case AuthActions.LOGIN_START:
      return {
        ...state,
        loading: true,
        authError: null,
      }
    case AuthActions.LOGIN_FAIL:
      return {
        ...state, 
        user: null,
        authError: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}
