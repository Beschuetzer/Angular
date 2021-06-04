import { User } from "src/app/models/user.model";


export interface State {
  user: User,
}

const INITIAL_STATE: State = {
  user: null,
}

export function authReducer(state = INITIAL_STATE, action) {
  switch (state.payload) {

    default:
      return state;
  }
}