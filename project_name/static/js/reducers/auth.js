import jwtDecode from 'jwt-decode';

import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGOUT_USER } from '../constants';

let initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  token: null,
  userData: {},
  status: '',
  statusType: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true
      });
    case LOGIN_USER_SUCCESS:
      let data = jwtDecode(action.payload.token);

      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        userData: {
          userID: data.user_id,
          username: data.username,
          email: data.email
        },
        status: (action.payload.showStatus) ? 'You have been successfully logged in.' : '',
        statusType: 'success'
      });
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        status: 'Your username or password are not correct',
        statusType: 'danger'
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        userData: {},
        status: 'You have been successfully logged out.',
        statusType: 'success'
      });
    default:
      return state;
  }
}
