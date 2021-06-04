import { User } from 'src/app/models/user.model';
import * as fromAuthActions from './auth.actions';

export interface State {
  user: User;
}

const INITIAL_STATE: State = {
  user: null,
};

export function authReducer(
  state = INITIAL_STATE,
  action: fromAuthActions.AuthActions
) {
  switch (action.type) {
    case fromAuthActions.LOGIN:
      return {
        ...state,
        user: new User(
          action.payload.email,
          action.payload.userId,
          action.payload.token,
          action.payload.expirationDate,
        ),
      };
    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: INITIAL_STATE.user,
      }
    default:
      return state;
  }
}
