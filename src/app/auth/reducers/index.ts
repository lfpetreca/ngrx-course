import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions-types';

import { User } from '../model/user.model';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => ({ user: action.user })),
  on(AuthActions.logout, (state, action) => ({ user: undefined }))
);
