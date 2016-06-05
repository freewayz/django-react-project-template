import { checkStatus, parseJSON, getResponseBody } from '../../utils';
import { login } from './login';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
} from '../../constants';

export function registerUserSuccess(profile) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {
      profile,
    },
  };
}

export function registerUserFailure(error) {
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      status: error.response.status,
    },
  };
}

export function registerUserRequest() {
  return {
    type: REGISTER_USER_REQUEST,
  };
}

export function register(...fields) {
  return (dispatch) => fetch('http://127.0.0.1:8000/api/v1/users/', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: fields[0].email.value,
      first_name: fields[0].firstName.value,
      last_name: fields[0].lastName.value,
      password: fields[0].password.value,
    }),
  })
  .then(dispatch(registerUserRequest))
  .then(checkStatus)
  .then(parseJSON)
  .then(response => {
    dispatch(registerUserSuccess(response));
    dispatch(login(response.email, response.password));
  })
  .catch(error => {
    const reader = error.response.body.getReader();
    getResponseBody(reader)
    .then((result) => {
      const e = error;
      e.body = result;
      dispatch(registerUserFailure(e));
    });
  });
}
