import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';

import { checkStatus, parseJSON, getResponseBody } from '../../utils';
import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST } from '../../constants';

export function loginUserSuccess(token, showStatus) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
      showStatus,
    },
  };
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      error,
    },
  };
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST,
  };
}

export function login(email, password) {
  return (dispatch) => fetch('http://127.0.0.1:8000/api/v1/auth/obtain_token/', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  .then(dispatch(loginUserRequest))
  .then(checkStatus)
  .then(parseJSON)
  .then(response => {
    try {
      jwtDecode(response.token);
      dispatch(loginUserSuccess(response.token, true));
      dispatch(push('/dashboard'));
    } catch (e) {
      dispatch(loginUserFailure({
        response: {
          status: 403,
          statusText: 'Invalid token',
        },
      }));
    }
  })
  .catch(error => {
    const reader = error.response.body.getReader();
    getResponseBody(reader)
    .then((result) => {
      const e = error;
      e.body = result;
      dispatch(loginUserFailure(e));
    });
  });
}
