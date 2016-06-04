import jwtDecode from 'jwt-decode';

import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  DISMISS_AUTH_STATUS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE
} from '../constants';

let initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  token: null,
  userData: {},
  profileRequested: false,
  currentProfile: {},
  status: '',
  statusType: ''
};

// @TODO implement registration action routes

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
        userData: Object.assign({}, state.userData, {
          userID: data.user_id,
          username: data.username,
          email: data.email
        }),
        status: (action.payload.showStatus) ? 'You have been successfully logged in.' : '',
        statusType: 'success'
      });
    case LOGIN_USER_FAILURE:
      let response = action.payload.error.body;
      let status = 'Your username or password are not correct';

      if (response.hasOwnProperty('non_field_errors')) {
        status = response.non_field_errors.join(', ');
      }

      return Object.assign({}, state, {
        isAuthenticating: false,
        status: status,
        statusType: 'danger'
      });
    case DISMISS_AUTH_STATUS:
      return Object.assign({}, state, {
        status: '',
        statusType: ''
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        userData: {},
        status: 'You have been successfully logged out.',
        statusType: 'success'
      });
    case REGISTER_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true
      });
    case REGISTER_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        userData: Object.assign({}, state.userData, {
          first_name: action.payload.profile.first_name,
          last_name: action.payload.profile.last_name
        })
      });
    case REGISTER_USER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        status: 'This email is already in use',
        statusType: 'danger'
      });
    case GET_PROFILE_REQUEST:
      return Object.assign({}, state, {
        profileRequested: true
      })
    case GET_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        profileRequested: false,
        currentProfile: Object.assign({}, state.currentProfile, action.payload.profile)
      })
    case GET_PROFILE_FAILURE:
      return Object.assign({}, state, {
        profileRequested: false,
        currentProfile: {},
        status: 'Could not find profile for user',
        statusType: 'danger'
      })
    default:
      return state;
  }
}
