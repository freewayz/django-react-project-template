import { Map } from 'immutable';
import jwtDecode from 'jwt-decode';

import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGOUT_USER } from '../constants';

let initialState = Map({
  isAuthenticating: false,
  isAuthenticated: false,
  token: null,
  userData: Map({}),
  status: '',
  statusType: ''
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return state.merge(Map({
        isAuthenticating: true
      }));
    case LOGIN_USER_SUCCESS:
      let data = jwtDecode(action.payload.token);

      return state.merge(Map({
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        userData: Map({
          userID: data.user_id,
          username: data.username,
          email: data.email
        }),
        status: (action.payload.showStatus) ? 'You have been successfully logged in.' : '',
        statusType: 'success'
      }));
    case LOGIN_USER_FAILURE:
      return state.merge(Map({
        isAuthenticating: false,
        status: 'Your username or password are not correct',
        statusType: 'danger'
      }));
    case LOGOUT_USER:
      return state.merge(Map({
        isAuthenticated: false,
        token: null,
        userData: Map({}),
        status: 'You have been successfully logged out.',
        statusType: 'success'
      }));
    default:
      return state;
  }
}
