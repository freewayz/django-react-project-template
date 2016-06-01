import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';

import { checkStatus, parseJSON, getResponseBody } from '../utils';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  DISMISS_AUTH_STATUS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST
} from '../constants';

export function loginUserSuccess(token, showStatus) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      showStatus: showStatus
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      error: error
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function dismissAuthStatus() {
  return {
    type: DISMISS_AUTH_STATUS
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(push('/login'));
  }
}

export function login(email, password) {
  return (dispatch) => {
    return fetch('http://127.0.0.1:8000/api/v1/auth/obtain_token/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(dispatch(loginUserRequest))
    .then(checkStatus)
    .then(parseJSON)
    .then(response => {
      try {
        let decoded = jwtDecode(response.token);
        dispatch(loginUserSuccess(response.token, true));
        dispatch(push('/dashboard'));
      } catch (e) {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    })
    .catch(error => {
      let reader = error.response.body.getReader();
      getResponseBody(reader)
      .then((result) => {
        error.body = result;
        dispatch(loginUserFailure(error));
      });
    })
  }
}

export function registerUserSuccess(profile) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {
      profile: profile
    }
  }
}

export function registerUserFailure(error) {
  console.log(error.body);
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      status: error.response.status
    }
  }
}

export function registerUserRequest() {
  return {
    type: REGISTER_USER_REQUEST
  }
}

export function register(...fields) {
  return (dispatch) => {
    return fetch('http://127.0.0.1:8000/api/v1/users/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: fields[0].email.value,
        first_name: fields[0].first_name.value,
        last_name: fields[0].last_name.value,
        password: fields[0].password.value
      })
    })
    .then(dispatch(registerUserRequest))
    .then(checkStatus)
    .then(parseJSON)
    .then(response => {
      dispatch(registerUserSuccess(response));
      dispatch(login(response.email, response.password))
    })
    .catch(error => {
      let reader = error.response.body.getReader();
      getResponseBody(reader)
      .then((result) => {
        error.body = result;
        dispatch(registerUserFailure(error));
      });
    })
  }
}
